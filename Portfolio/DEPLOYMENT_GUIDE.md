# Deployment Guide: GitHub & Vercel

This guide will walk you through pushing your portfolio to GitHub and deploying it live on Vercel.

## Prerequisites
1.  **Git Installed**: Ensure you have Git installed on your computer.
2.  **GitHub Account**: [Sign up here](https://github.com/).
3.  **Vercel Account**: [Sign up here](https://vercel.com/) (Continue with GitHub).

---

## Step 1: Initialize Git and Commit Changes

Open your terminal (PowerShell or Command Prompt) and navigate to your project folder:

```powershell
cd c:\Users\Chuybi\Downloads\Photo\Portfolio
```

Run the following commands one by one:

1.  **Initialize Git**:
    ```bash
    git init
    ```

2.  **Add all files**:
    ```bash
    git add .
    ```

3.  **Commit changes**:
    ```bash
    git commit -m "Initial commit: Portfolio website structure and content"
    ```

---

## Step 2: Push to GitHub

1.  Go to [GitHub.com](https://github.com) and sign in.
2.  Click the **+** icon in the top right and select **New repository**.
3.  Name your repository (e.g., `my-portfolio`).
4.  Leave it **Public**.
5.  **Do not** check "Initialize with README" (we already have files).
6.  Click **Create repository**.

You will see a screen with instructions. Look for the section **"…or push an existing repository from the command line"**. Copy those commands. They will look like this (replace `YOUR_USERNAME` with your actual username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

Run those commands in your terminal.

---

## Step 3: Deploy to Vercel

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** > **Project**.
3.  You should see your `my-portfolio` repository from GitHub listed under "Import Git Repository". Click **Import**.
4.  **Configure Project**:
    *   **Framework Preset**: Other (since it's plain HTML/CSS/JS, this is fine, or it might auto-detect).
    *   **Root Directory**: `./` (default).
5.  Click **Deploy**.

Vercel will build your site. In less than a minute, you should see a "Congratulations!" screen with a link to your live site (e.g., `https://my-portfolio-tau.vercel.app`).

---

## Updating Your Site

Whenever you make changes to your code (e.g., adding new projects):

1.  **Add changes**: `git add .`
2.  **Commit**: `git commit -m "Added new project"`
3.  **Push**: `git push`

Vercel will **automatically** detect the push and redeploy your site with the new changes!
