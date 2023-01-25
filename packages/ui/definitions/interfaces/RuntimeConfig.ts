export interface RuntimeConfig {
  strapi: {
    url: string
  }
  public: {
    baseUrl: string
    strapi: {
      url: string
    }
  }
}
