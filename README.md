HealthSurvey
flowchart TB
    %% Tooling & Configuration
    subgraph "Tooling & Configurations"
        direction TB
        ViteConfig["vite.config.ts"]:::tool
        PostCSS["postcss.config.js"]:::tool
        TailwindConfig["tailwind.config.js"]:::tool
        ESLintCfg["eslint.config.js"]:::tool
        subgraph "TypeScript Configs"
            TSBase["tsconfig.json"]:::tool
            TSApp["tsconfig.app.json"]:::tool
            TSNode["tsconfig.node.json"]:::tool
            ViteEnv["src/vite-env.d.ts"]:::tool
        end
    end

    %% Build Pipeline
    subgraph "Build & Development Pipeline"
        direction TB
        Vite["Vite Dev Server & Bundler"]:::tool
        TypeScript["TypeScript Compiler"]:::tool
        PostCSSProc["PostCSS Processor"]:::tool
        TailwindProc["Tailwind CSS Processor"]:::tool
    end

    %% Hosting Layer
    subgraph "Hosting & CDN"
        direction TB
        CDN["Cloud Hosting / CDN"]:::host
    end

    %% Browser Client
    subgraph "Browser / Client (React SPA)"
        direction TB
        INDEX["index.html"]:::ui
        Main["src/main.tsx"]:::ui
        App["App.tsx – Root Component"]:::ui
        subgraph "UI Components"
            direction TB
            Header["Header Component"]:::ui
            Welcome["WelcomeSection Component"]:::ui
            ProgressBar["ProgressBar Component"]:::ui
            QuestionCard["QuestionCard Component"]:::ui
            SurveyForm["SurveyForm Component"]:::ui
        end
        Styles["Global Styles (index.css)"]:::ui
    end

    %% External Services
    SurveyAPI["External Survey API"]:::external
    Database["External Database"]:::external

    %% Data Flow
    ViteConfig --> Vite
    PostCSS --> PostCSSProc
    TailwindConfig --> TailwindProc
    TSBase --> TypeScript
    TSApp --> TypeScript
    TSNode --> TypeScript
    ViteEnv --> TypeScript

    Vite -->|bundles code| INDEX
    TypeScript --> INDEX
    PostCSSProc --> Styles
    TailwindProc --> Styles

    INDEX -->|loads bundle| CDN
    CDN -->|serves SPA| INDEX

    INDEX --> Main
    Main --> App
    App --> Header
    App --> Welcome
    App --> ProgressBar
    App --> QuestionCard
    App --> SurveyForm
    Styles --> INDEX

    SurveyForm -->|POST responses| SurveyAPI
    SurveyAPI -->|stores data| Database

    %% Click Events
    click INDEX "https://github.com/wafiamustafa/healthsurvey/blob/main/index.html"
    click Main "https://github.com/wafiamustafa/healthsurvey/blob/main/src/main.tsx"
    click App "https://github.com/wafiamustafa/healthsurvey/blob/main/src/App.tsx"
    click Header "https://github.com/wafiamustafa/healthsurvey/blob/main/src/components/Header.tsx"
    click Welcome "https://github.com/wafiamustafa/healthsurvey/blob/main/src/components/WelcomeSection.tsx"
    click ProgressBar "https://github.com/wafiamustafa/healthsurvey/blob/main/src/components/ProgressBar.tsx"
    click QuestionCard "https://github.com/wafiamustafa/healthsurvey/blob/main/src/components/QuestionCard.tsx"
    click SurveyForm "https://github.com/wafiamustafa/healthsurvey/blob/main/src/components/SurveyForm.tsx"
    click Styles "https://github.com/wafiamustafa/healthsurvey/blob/main/src/index.css"
    click ViteConfig "https://github.com/wafiamustafa/healthsurvey/blob/main/vite.config.ts"
    click PostCSS "https://github.com/wafiamustafa/healthsurvey/blob/main/postcss.config.js"
    click TailwindConfig "https://github.com/wafiamustafa/healthsurvey/blob/main/tailwind.config.js"
    click ESLintCfg "https://github.com/wafiamustafa/healthsurvey/blob/main/eslint.config.js"
    click TSBase "https://github.com/wafiamustafa/healthsurvey/blob/main/tsconfig.json"
    click TSApp "https://github.com/wafiamustafa/healthsurvey/blob/main/tsconfig.app.json"
    click TSNode "https://github.com/wafiamustafa/healthsurvey/blob/main/tsconfig.node.json"
    click ViteEnv "https://github.com/wafiamustafa/healthsurvey/blob/main/src/vite-env.d.ts"

    %% Styles
    classDef ui fill:#D6E4FF,stroke:#0366d6,stroke-width:1px
    classDef tool fill:#DFF5E1,stroke:#28a745,stroke-width:1px
    classDef external fill:#FFE6CC,stroke:#d73a49,stroke-width:1px
    classDef host fill:#EDE1FF,stroke:#6f42c1,stroke-width:1px
