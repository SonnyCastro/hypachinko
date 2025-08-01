declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PROJECT_ID: string
      NEXT_PUBLIC_ENABLE_TESTNETS?: string
    }
  }
}

export { } 