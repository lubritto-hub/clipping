#!/usr/bin/env python3
"""
Clipping automático de notícias sobre BIOCHAR.
Fontes: Google News RSS (Português, Inglês e Espanhol).
Envia um resumo diário por email. Usa só a biblioteca padrão do Python
(não precisa instalar nada).

Como funciona:
  1. Busca notícias das últimas HORAS_ATRAS horas em cada idioma.
  2. Remove duplicatas e ordena pela mais recente.
  3. Monta um email em HTML e envia via SMTP (Gmail por padrão).

Configuração sensível (senha, emails) vem de variáveis de ambiente,
para nunca ficar exposta no código. No GitHub, isso vira "Secrets".
"""

import os
import ssl
import smtplib
from urllib.request import Request, urlopen
from urllib.parse import quote
from xml.etree import ElementTree as ET
from email.message import EmailMessage
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone, timedelta

# ----------------------------------------------------------------------
# 1) CONFIGURAÇÃO  (mexa só aqui)
# ----------------------------------------------------------------------

# Palavras-chave. Pode adicionar termos: ex. ["biochar", "biocarvão"]
# Vários termos são combinados com OR (qualquer um deles).
PALAVRAS_CHAVE = ["biochar", "biocarvão"]

# Janela de tempo: pega notícias publicadas nas últimas X horas.
HORAS_ATRAS = 24

# Idiomas/regiões a monitorar. Cada bloco é um "feed" do Google News.
IDIOMAS = [
    {"rotulo": "🇧🇷 Português", "hl": "pt-BR", "gl": "BR", "ceid": "BR:pt-419"},
    {"rotulo": "🇺🇸 English",    "hl": "en-US", "gl": "US", "ceid": "US:en"},
    {"rotulo": "🇪🇸 Español",    "hl": "es-419", "gl": "ES", "ceid": "ES:es"},
]

# Enviar email mesmo quando não houver notícia nova? (para você saber que rodou)
ENVIAR_SE_VAZIO = True

# Configuração de email — preenchida por variáveis de ambiente / Secrets.
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
EMAIL_FROM = os.environ.get("EMAIL_FROM", "")      # seu Gmail
EMAIL_SENHA = os.environ.get("EMAIL_SENHA", "")    # "senha de app" do Gmail
EMAIL_TO = os.environ.get("EMAIL_TO", EMAIL_FROM)  # destino (pode ser você mesma)

# ----------------------------------------------------------------------
# 2) BUSCA DAS NOTÍCIAS
# ----------------------------------------------------------------------

def montar_url(idioma):
    """Monta a URL do feed RSS do Google News para um idioma."""
    consulta = " OR ".join(PALAVRAS_CHAVE)
    q = quote(consulta)
    return (
        f"https://news.google.com/rss/search?q={q}"
        f"&hl={idioma['hl']}&gl={idioma['gl']}&ceid={idioma['ceid']}"
    )


def buscar_feed(url):
    """Baixa o XML do feed e devolve a árvore parseada."""
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 (clipping-biochar)"})
    with urlopen(req, timeout=30) as resp:
        dados = resp.read()
    return ET.fromstring(dados)


def coletar_noticias(idioma, corte):
    """Devolve lista de notícias recentes (mais novas que 'corte') de um idioma."""
    noticias = []
    try:
        raiz = buscar_feed(montar_url(idioma))
    except Exception as e:
        print(f"[aviso] falha ao buscar {idioma['rotulo']}: {e}")
        return noticias

    for item in raiz.iter("item"):
        titulo = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").strip()
        pub = item.findtext("pubDate")
        fonte = item.findtext("source") or ""

        # Data de publicação
        try:
            data = parsedate_to_datetime(pub)
            if data.tzinfo is None:
                data = data.replace(tzinfo=timezone.utc)
        except Exception:
            data = datetime.now(timezone.utc)

        if data < corte:
            continue

        # No Google News o título costuma vir como "Título - Fonte"
        if not fonte and " - " in titulo:
            titulo, fonte = titulo.rsplit(" - ", 1)

        noticias.append({
            "titulo": titulo,
            "link": link,
            "fonte": fonte.strip(),
            "data": data,
        })
    return noticias


def remover_duplicatas(noticias):
    """Remove notícias com título praticamente igual."""
    vistos = set()
    unicas = []
    for n in noticias:
        chave = n["titulo"].lower().strip()
        if chave and chave not in vistos:
            vistos.add(chave)
            unicas.append(n)
    return unicas


# ----------------------------------------------------------------------
# 3) MONTAGEM DO EMAIL
# ----------------------------------------------------------------------

def montar_html(por_idioma, total):
    hoje = datetime.now().strftime("%d/%m/%Y")
    partes = [f"""
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:auto;color:#222">
      <h2 style="color:#2e7d32;margin-bottom:2px">🌱 Clipping Biochar</h2>
      <p style="color:#777;margin-top:0;font-size:13px">{hoje} · {total} notícia(s) nas últimas {HORAS_ATRAS}h</p>
    """]

    for idioma in IDIOMAS:
        itens = por_idioma.get(idioma["rotulo"], [])
        if not itens:
            continue
        partes.append(f'<h3 style="border-bottom:2px solid #c8e6c9;padding-bottom:4px;margin-top:24px">{idioma["rotulo"]}</h3>')
        for n in itens:
            hora = n["data"].astimezone().strftime("%d/%m %H:%M")
            fonte = f' · <span style="color:#888">{n["fonte"]}</span>' if n["fonte"] else ""
            partes.append(f"""
            <div style="margin:10px 0">
              <a href="{n['link']}" style="color:#1565c0;text-decoration:none;font-weight:bold">{n['titulo']}</a>
              <div style="font-size:12px;color:#999">{hora}{fonte}</div>
            </div>""")

    if total == 0:
        partes.append('<p style="color:#999">Nenhuma notícia nova hoje. (O clipping rodou normalmente.)</p>')

    partes.append('<p style="font-size:11px;color:#bbb;margin-top:30px">Gerado automaticamente · fonte: Google News</p></div>')
    return "".join(partes)


def enviar_email(html, total):
    if not EMAIL_FROM or not EMAIL_SENHA:
        print("[erro] EMAIL_FROM ou EMAIL_SENHA não configurados. Email não enviado.")
        print("Prévia do conteúdo gerado:\n")
        print(html[:1000])
        return

    msg = EmailMessage()
    msg["Subject"] = f"🌱 Clipping Biochar — {total} notícia(s) — {datetime.now().strftime('%d/%m')}"
    msg["From"] = EMAIL_FROM
    msg["To"] = EMAIL_TO
    msg.set_content("Seu leitor não exibe HTML. Veja a versão em HTML do clipping.")
    msg.add_alternative(html, subtype="html")

    contexto = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=contexto) as s:
        s.login(EMAIL_FROM, EMAIL_SENHA)
        s.send_message(msg)
    print(f"[ok] Email enviado para {EMAIL_TO} com {total} notícia(s).")


# ----------------------------------------------------------------------
# 4) EXECUÇÃO
# ----------------------------------------------------------------------

def main():
    corte = datetime.now(timezone.utc) - timedelta(hours=HORAS_ATRAS)
    por_idioma = {}
    total = 0

    for idioma in IDIOMAS:
        itens = coletar_noticias(idioma, corte)
        itens = remover_duplicatas(itens)
        itens.sort(key=lambda n: n["data"], reverse=True)
        por_idioma[idioma["rotulo"]] = itens
        total += len(itens)
        print(f"{idioma['rotulo']}: {len(itens)} notícia(s)")

    if total == 0 and not ENVIAR_SE_VAZIO:
        print("Nada novo e ENVIAR_SE_VAZIO=False. Não enviando.")
        return

    html = montar_html(por_idioma, total)
    enviar_email(html, total)


if __name__ == "__main__":
    main()
