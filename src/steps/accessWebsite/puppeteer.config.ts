import { BadRequestException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

export class PuppeteerService {
  private browser: puppeteer.Browser | null = null;
  private page: puppeteer.Page | null = null;
  private readonly url: string = 'https://br.openfoodfacts.org/';
  private readonly urlWidhId: string = 'https://br.openfoodfacts.org/produto/';

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    console.log("Puppeteer inicializado com sucesso.");
  }

  async goToUrl(): Promise<void> {
    if (!this.page) {
      throw new BadRequestException('A página do Puppeteer não foi inicializada.');
    }
    console.log("Navegando até a URL:", this.url);
    await this.page.goto(this.url);
    console.log("URL carregada com sucesso.");
  }

  async goToUrlWithId(id: number): Promise<void> {
    if (!this.page) {
      throw new BadRequestException('A página do Puppeteer não foi inicializada.');
    }
    const url = `${this.urlWidhId}${id}`;
    console.log("Navegando até a URL:", url);
    await this.page.goto(url);
    console.log("URL carregada com sucesso.");
  }

  async evaluate<T extends any[]>(fn: (...args: T) => any, ...args: T): Promise<any> {
    if (!this.page) {
      throw new Error('A página do Puppeteer não foi inicializada.');
    }
    return await this.page.evaluate(fn, ...args);
  }
  
  async setupConsoleListener(callback: (msg: puppeteer.ConsoleMessage) => void): Promise<void> {
    if (!this.page) {
      throw new Error('A página do Puppeteer não foi inicializada.');
    }
    await this.page.on('console', callback);
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log("Puppeteer encerrado.");
    }
  }
}
