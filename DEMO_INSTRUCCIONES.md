# Guía de Demo — Unio B2B
### Para uso interno del equipo · Versión local

---

## ¿Qué es esto?

Esta es la app de Unio en modo **demo local**. Tiene 5 vacantes ficticias precargadas que cubren todo el flujo del pipeline, desde el análisis de IA hasta la selección de finalistas. Úsalas para mostrar el producto a empresas sin conectar ningún backend real.

---

## 1. Preparación inicial (solo la primera vez)

### Paso 1 — Instalar Node.js

Node.js es el motor que necesita la app para correr. Solo se instala una vez.

1. Ve a [nodejs.org](https://nodejs.org) en el navegador.
2. Descarga el instalador con la etiqueta **LTS** (la versión recomendada).
3. Abre el archivo `.msi` descargado y sigue el asistente: siguiente → siguiente → instalar.
4. Cuando termine, **reinicia el computador**.

Para verificar que quedó bien instalado, abre la terminal (ver paso 2) y escribe:

```
node --version
```

Debes ver algo como `v20.x.x`. Si aparece ese número, todo está listo.

---

### Paso 2 — Abrir la terminal en Windows

La terminal es la ventana de comandos donde correrás la app.

**Opción A (recomendada):** Busca `PowerShell` en el menú Inicio → clic derecho → **Ejecutar como administrador**.

**Opción B:** Presiona `Windows + R`, escribe `cmd` y presiona Enter.

---

### Paso 3 — Descomprimir el .zip del proyecto

1. Descarga el archivo `.zip` que te compartió el equipo (ejemplo: `unio-demo.zip`).
2. Haz clic derecho sobre el archivo → **Extraer todo...** → elige una carpeta fácil de encontrar, por ejemplo `C:\Users\TuNombre\Desktop\unio-demo`.
3. Haz clic en **Extraer**.

Dentro de la carpeta extraída debes ver una subcarpeta llamada `unio-app`.

---

### Paso 4 — Navegar a la carpeta en la terminal

En la terminal que abriste, escribe el siguiente comando reemplazando la ruta por donde descomprimiste el zip:

```
cd C:\Users\TuNombre\Desktop\unio-demo\unio-app
```

> **Tip:** Puedes arrastrar la carpeta `unio-app` directamente desde el Explorador de archivos a la ventana de la terminal — escribirá la ruta automáticamente. Luego presiona Enter.

Para confirmar que estás en la carpeta correcta, escribe `dir` y presiona Enter. Debes ver archivos como `package.json`, `vite.config.ts`, etc.

---

### Paso 5 — Instalar las dependencias (solo la primera vez)

```
npm install
```

Esto descarga todos los paquetes necesarios. Puede tardar entre 1 y 3 minutos. Espera hasta que vuelva a aparecer el cursor parpadeante.

---

## 2. Levantar la app (cada vez que hagas demo)

Con la terminal abierta y ubicada en la carpeta `unio-app`, corre:

```
npm run dev
```

La terminal mostrará algo como:

```
  VITE v5.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

Abre Chrome o Edge, escribe `http://localhost:5173` en la barra de direcciones y presiona Enter. **Listo**, ya tienes la app corriendo.

> Mantén la terminal abierta durante toda la demo. Ciérrala solo cuando termines.

---

## 3. Las 5 vacantes demo

Todas aparecen en la pantalla de inicio **"Tus vacantes"**. Cada una representa una etapa distinta del pipeline para que puedas mostrar cualquier momento del proceso.

| Vacante | Etapa activa | Candidatos | Para mostrar |
|---|---|---|---|
| **Recepcionista** | Scoring IA | 15 | Vista de scoring inicial con semáforo de resultados |
| **Auxiliar de Bodega** | Pre-screening IA | 15 | Resultados de entrevista IA y análisis de perfil |
| **Analista de Talento Humano** | Entrevistas | 10 | Coordinación de entrevistas, notas del entrevistador |
| **Jefe de Finanzas** | Evaluaciones | 6 | Prueba psicológica, prueba técnica, radar de competencias |
| **Gerente de Ventas** | Finalistas | 3 | Vista final de los mejores candidatos con scorecard completo |

---

## 4. Guión de demo recomendado

### Flujo completo (15–20 min)

1. **Muestra el dashboard** → señala las 5 vacantes, el progreso por etapa y las métricas.

2. **Entra a "Recepcionista"** → haz clic en la vacante → ve a **Scoring IA**.
   - Muestra el listado de candidatos con colores del semáforo.
   - Abre el perfil de cualquier candidato para ver el análisis detallado.
   - Explica los criterios de no negociables y señales por validar.
   - Haz clic en **Hoja de vida** — se abrirá el CV del candidato en una pestaña nueva.

3. **Entra a "Auxiliar de Bodega"** → ve a **Pre-screening IA**.
   - Muestra cómo la IA ya entrevistó a los candidatos.
   - Abre un perfil: muestra el acordeón de Pre-entrevista IA con el resumen generado.

4. **Entra a "Analista de TH"** → ve a **Entrevistas**.
   - Muestra los formularios de entrevista con respuestas del candidato.
   - Señala la progresión del embudo: menos candidatos que en etapas anteriores.

5. **Entra a "Jefe de Finanzas"** → ve a **Evaluaciones**.
   - Muestra la prueba psicológica: radar de competencias, veredicto conductual, gaps.
   - Muestra el estado de la prueba técnica (algunos la contestaron, otros no).
   - **Demo interactiva**: selecciona 3 candidatos y haz clic en "Pasar etapa" → se desbloquea Finalistas en tiempo real.

6. **Entra a "Gerente de Ventas"** → ve a **Finalistas**.
   - Muestra el grid comparativo de los 3 finalistas.
   - Abre el perfil de uno: recorre todos los acordeones del onepager (scoring → psico → técnica).
   - Cierra con el mensaje de "proceso cerrado" del flujo completo.

---

## 5. Función "Pasar etapa" (demo interactiva)

Esta es la función más impactante para mostrar en vivo. Úsala en **Jefe de Finanzas → Evaluaciones**:

1. En el listado de evaluaciones, **selecciona exactamente 3 candidatos** (los checkbox de la izquierda).
2. Haz clic en el botón **"Pasar etapa"**.
3. Los candidatos aparecerán en Finalistas con el chip **"Pendiente"** en gris.
4. En el sidebar izquierdo, **Finalistas se desbloqueará** automáticamente.
5. Entra a Finalistas para mostrar la vista comparativa.

> Si seleccionas menos de 3 o intentas seleccionar más de 3, aparecerá un modal explicativo. Es parte del flujo — muéstralo, refuerza la lógica de negocio.

---

## 6. Resetear la demo

Si hiciste la demo interactiva y quieres volver al estado original (para una próxima demo o para probar de nuevo):

1. En Chrome/Edge, presiona `F12` para abrir DevTools.
2. Ve a la pestaña **Application** (puede estar oculta — haz clic en `»` si no la ves).
3. En el panel izquierdo, haz clic en **Local Storage** → `http://localhost:5173`.
4. Borra todas las entradas que empiecen con `mock_stage_` (clic derecho → Delete).
5. Recarga la página con `F5`.

Todo vuelve al estado inicial.

---

## 7. Lo que NO debes tocar

- No cierres la terminal mientras la demo está activa.
- No entres a rutas de vacantes reales (las que vienen de la API) — esas pueden fallar si no hay conexión.
- No modifiques archivos dentro de la carpeta `unio-app` sin consultar al equipo técnico.

---

## 8. Preguntas frecuentes

**¿Necesito internet para la demo?**
No. Una vez que corriste `npm install` por primera vez, todo funciona sin conexión. Solo necesitas la terminal abierta.

**¿Los datos demo son reales?**
No. Todos los candidatos, vacantes y empresas son completamente ficticios e inventados para propósitos de presentación.

**¿Puedo hacer la demo desde proyector o pantalla externa?**
Sí. Conecta el proyector antes de abrir el navegador y usa `localhost:5173` en pantalla completa (`F11`).

**¿Qué hago si al correr `npm install` aparece un error de permisos?**
Cierra la terminal, ábrela de nuevo con clic derecho → **Ejecutar como administrador** y repite el comando.

**La app no carga o da error, ¿qué hago?**
1. Verifica que la terminal siga abierta y muestre el mensaje de Vite.
2. Intenta recargar con `Ctrl + Shift + R` (recarga forzada).
3. Si persiste, cierra la terminal, vuelve a la carpeta `unio-app` con `cd` y corre `npm run dev` de nuevo.

**¿Qué pasa si el cliente pregunta por una funcionalidad que no está en demo?**
Toma nota y avísale al equipo. No improvises mostrando rutas fuera del flujo de las 5 vacantes demo.

---

*Guía preparada para uso interno — equipo Unio · Actualizada Abril 2025*
