# Guía Operativa SEO: Google Search Console y Difusión Estudiantil

> **Sitio Web:** `https://openmad.nikelyh.tech/`  
> **Sitemap:** `https://openmad.nikelyh.tech/sitemap.xml`  
> **Robots:** `https://openmad.nikelyh.tech/robots.txt`

---

## 1. Alta y Verificación en Google Search Console

Para que Google comience a mostrar OpenMad a los estudiantes que buscan información de la UNAMAD, sigue estos pasos:

### Paso 1: Acceder a Search Console
1. Ingresa a [Google Search Console](https://search.google.com/search-console).
2. Haz clic en **Añadir propiedad**.
3. Selecciona **Prefijo de la URL** e ingresa:
   ```text
   https://openmad.nikelyh.tech/
   ```

### Paso 2: Método de Verificación Recomendado
Tienes dos alternativas rápidas:
* **Opción A (Etiqueta HTML - Más rápida):**
  1. En Search Console, selecciona la opción **Etiqueta HTML**.
  2. Copia el valor de `content="..."` que te proporciona Google (ejemplo: `google-site-verification=abc123xyz...`).
  3. Descomenta y pega ese código en [`apps/vanilla/index.html`](file:///c:/Users/yohan/myspace/lab/active/openmad/apps/vanilla/index.html#L12):
     ```html
     <meta name="google-site-verification" content="TU_CODIGO_AQUI" />
     ```
  4. Haz deploy y presiona **Verificar** en Search Console.
* **Opción B (Registro DNS TXT en tu proveedor de dominio / Vercel / Cloudflare):**
  1. Si gestionas el dominio `nikelyh.tech`, añade el registro TXT indicado por Google en la zona DNS.

---

## 2. Envío del Mapa del Sitio (Sitemap)

Una vez verificada la propiedad:
1. En el menú lateral izquierdo de Search Console, dirígete a **Sitemaps**.
2. En el campo *"Añadir un sitemap nuevo"*, escribe:
   ```text
   sitemap.xml
   ```
3. Haz clic en **Enviar**.
4. En cuestión de minutos u horas, el estado pasará a **Correcto** y Google habrá descubierto todas las URLs clave de OpenMad.

---

## 3. Forzar Indexación Prioritaria de Páginas Clave (Inspección de URLs)

Para que Google indexe de inmediato las páginas más importantes sin esperar al rastreador semanal:
1. En la barra superior de Search Console (*"Inspeccionar las URLs de..."*), pega cada una de estas direcciones:
   * `https://openmad.nikelyh.tech/`
   * `https://openmad.nikelyh.tech/#rutas`
   * `https://openmad.nikelyh.tech/#rutas?ruta=grado-bachiller`
   * `https://openmad.nikelyh.tech/#rutas?ruta=practicas-preprofesionales`
2. Presiona Enter y luego haz clic en el botón **Solicitar indexación**.

---

## 4. Kit de Difusión para Grupos de WhatsApp / Redes de la UNAMAD

Al compartir estos enlaces, gracias a la **Fase 2**, WhatsApp y Telegram mostrarán automáticamente la tarjeta con el logo oficial y la descripción llamativa.

### Plantilla 1: Para grupos generales de estudiantes e ingresantes
```text
¡Hola a todos! 👋 Les comparto una herramienta libre y sin fines de lucro creada para nosotros los estudiantes de la UNAMAD:

📍 *OpenMad* – Guía de Trámites y Procesos Académicos
👉 https://openmad.nikelyh.tech/

Tiene explicados paso a paso los requisitos, formatos y ventanillas para:
✅ Grado de Bachiller
✅ Prácticas Preprofesionales
✅ Tesis y Título Profesional

Además puedes guardar tu avance para no perderte entre tanto papeleo. ¡Compártanlo con sus compañeros! 🚀
```

### Plantilla 2: Para alumnos de últimos ciclos (Egresados / Bachiller)
```text
Colegas, si están empezando con los trámites de egreso o bachiller en la UNAMAD, aquí armaron un mapa con todo el proceso ordenado, formatos descargables y requisitos por carrera:
👉 https://openmad.nikelyh.tech/#rutas?ruta=grado-bachiller

Ahorra bastante tiempo de ida y vuelta en ventanillas. Espero les sirva 🙌
```

---

## 5. Métricas a Monitorear (Primeros 30 días)

En el panel de **Rendimiento** de Search Console:
* **Consultas:** Revisa qué términos escriben los alumnos (ej. *"mesa de partes unamad"*, *"reglamento practicas unamad"*).
* **Páginas:** Identifica qué rutas reciben más tráfico y necesitan módulos adicionales.
* **CTR (Click-Through Rate):** Apunta a mantener un CTR superior al **8%**.
