import { Page } from '@playwright/test';
import { HomePage } from '../page/home.page';
import { HeaderComponent } from '../page/component/header.component';
import { SearchResultPage } from './search-result.page';
import { WishlistPage } from '../page/wishlist.page';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';

export class PageManager {
  private readonly page: Page;
  private readonly homePage: HomePage;
  private readonly header: HeaderComponent;
  private readonly searchResultPage: SearchResultPage;
  private readonly wishlistPage: WishlistPage;
  private readonly loginPage: LoginPage;
  private readonly productPage: ProductPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.header = new HeaderComponent(this.page);
    this.searchResultPage = new SearchResultPage(this.page);
    this.wishlistPage = new WishlistPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.productPage = new ProductPage(this.page);
  }

  onHeader() {
    return this.header;
  }

  onHomePage() {
    return this.homePage;
  }

  onSearchResultPage() {
    return this.searchResultPage;
  }

  onWishlistPage() {
    return this.wishlistPage;
  }

  onLoginPage() {
    return this.loginPage;
  }

  onProductPage() {
    return this.productPage;
  }
}
