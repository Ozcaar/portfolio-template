# 💼 Portfolio Template

> [🇺🇸 English](/#English)  
> [🇲🇽 Español](/#Español)

Professional portfolio built with **Nuxt** and easily customizable.

🔗 **Demo:** [ozcaar.dev](https://www.ozcaar.dev/)

---

# English

## ✨ Features

- ⚡ **Nuxt (SSR / SSG ready)**
- 🎨 **Modern UI** with Tailwind CSS + DaisyUI
- 🌍 **i18n support** (Spanish / English)
- 🧩 Modular and scalable architecture
- 🛠️ Editable content without touching logic
- 📱 Fully responsive design
- 🚀 Optimized for Cloudflare Pages / Vercel / Netlify

---

## 🧱 Tech Stack

- **Framework:** Nuxt
- **UI:** Tailwind CSS, DaisyUI
- **Language:** TypeScript / JavaScript
- **Internationalization:** nuxt-i18n
- **Deploy:** Cloudflare Pages (compatible with others)

---

## 🚀 Usage & Customization

### 1️⃣ Get the project

You can **clone** or **fork** the repository to receive future updates:

`git clone <repository-url>`

or use **Fork** directly from GitHub.

----------

### 2️⃣ Configure content

Copy the example file and rename it:

`cp app/content/content.data.example.ts app/content/content.data.ts`

Then:

- You can edit `content.data.ts` later using the UI tool
- **Remove `content.data.ts` from `.gitignore`** so it can be committed to your repo

----------

### 3️⃣ Environment variables

Copy the example file:

`cp .env.example .env`

Customize the variables with your own information.  
To enable the visual content editor, add:

`NUXT_PUBLIC_CONTENT_EDITOR_ENABLED=true`

----------

### 4️⃣ Install dependencies

Using **pnpm** (recommended):

`pnpm install`

or with **npm**:

`npm install`

----------

### 5️⃣ Run locally

`pnpm dev`

Open:

👉 `http://localhost:3000`

----------

### 6️⃣ Visual content editor (optional)

With the editor enabled, you can customize the content from:

👉 `http://localhost:3000/admin/content-ui`

When finished:

1. **Export the content**
2. Replace the `content.data.ts` file
3. Save the changes

----------

### 7️⃣ Languages (i18n)

If you need to customize general texts:

- `i18n/en.json`
- `i18n/es.json`

----------

### 8️⃣ Save changes

`git add .
git commit -m "chore: personalize portfolio content"`

----------

## ☁️ Deploy on Cloudflare Pages

1. Go to the **Cloudflare Dashboard**
2. Navigate to **Workers & Pages**
3. Click **Create application → Pages**
4. Log in with **GitHub**
5. Select your repository
6. Preset: **Nuxt**
7. Add the **environment variables** (same as `.env`)
8. Click **Save and Deploy**

Done 🚀 Your portfolio will be live.

----------

# Español

## ✨ Características

- ⚡ **Nuxt (SSR / SSG ready)**
- 🎨 **UI moderna** con Tailwind CSS + DaisyUI
- 🌍 **Soporte i18n** (Español / Inglés)
- 🧩 Arquitectura modular y escalable
- 🛠️ Contenido editable sin tocar lógica
- 📱 Diseño totalmente responsive
- 🚀 Optimizado para Cloudflare Pages / Vercel / Netlify

---

## 🧱 Stack Tecnológico

- **Framework:** Nuxt
- **UI:** Tailwind CSS, DaisyUI
- **Lenguaje:** TypeScript / JavaScript
- **Internacionalización:** nuxt-i18n
- **Deploy:** Cloudflare Pages (compatible con otros)

---


## 🚀 Uso y Personalización

### 1️⃣ Obtener el proyecto

Puedes **clonar** o hacer **fork** del repositorio para recibir futuras actualizaciones:

`git clone <url-del-repo>` 

o usar **Fork** desde GitHub.

----------

### 2️⃣ Configurar el contenido

Copia el archivo de ejemplo y renómbralo:

`cp app/content/content.data.example.ts app/content/content.data.ts` 

Luego:

-   Puedes editar `content.data.ts` más adelante con la herramienta UI
    
-   **Elimina `content.data.ts` del `.gitignore`** para que se incluya en tu repo
    

----------

### 3️⃣ Variables de entorno

Copia el archivo de ejemplo:

`cp .env.example .env` 

Personaliza las variables según tu información.  
Para habilitar el editor visual de contenido agrega:

`NUXT_PUBLIC_CONTENT_EDITOR_ENABLED=true` 

----------

### 4️⃣ Instalación de dependencias

Con **pnpm** (recomendado):

`pnpm install` 

o con **npm**:

`npm install` 

----------

### 5️⃣ Ejecutar en local

`pnpm dev` 

Abre:

👉 `http://localhost:3000`

----------

### 6️⃣ Editor visual de contenido (opcional)

Con el editor habilitado, puedes personalizar el contenido desde:

👉 `http://localhost:3000/admin/content-ui`

Cuando termines:

1.  **Exporta el contenido**
    
2.  Reemplaza el archivo `content.data.ts`
    
3.  Guarda los cambios
    

----------

### 7️⃣ Idiomas (i18n)

Si necesitas personalizar textos generales:

-   `i18n/en.json`
    
-   `i18n/es.json`
    

----------

### 8️⃣ Guardar cambios

`git add .
git commit -m "chore: personalize portfolio content"` 

----------

## ☁️ Deploy en Cloudflare Pages

1.  Entra a **Cloudflare Dashboard**
    
2.  Ve a **Workers & Pages**
    
3.  Click en **Create application → Pages**
    
4.  Inicia sesión con **GitHub**
    
5.  Selecciona tu repositorio
    
6.  Preset: **Nuxt**
    
7.  Agrega las **variables de entorno** (las mismas de `.env`)
    
8.  Click en **Save and Deploy**
    

Listo 🚀 Tu portfolio quedará publicado.
