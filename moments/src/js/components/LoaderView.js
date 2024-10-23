import imageSourcesList from '../constants/imageSourcesList';
import { html } from '../helpers/utils';

class LoaderView {
  constructor() {
    this.id = 'loader';
  }

  render() {
    return html`
    <div class="loader" id="loader">
      <div class="loader__image-area">
        <div class="loader__image loader__coffee">
          <img src=${imageSourcesList.loaderSrc} alt="" />
        </div>
        <div class="loader__image loader__image_absolute loader__glare">
          <img src=${imageSourcesList.loaderGlareSrc} alt="" />
        </div>
        <div class="loader__image loader__image_absolute loader__steam">
          <img src=${imageSourcesList.loaderSteamSrc} alt="" />
        </div>
      </div>
    </div>
    `;
  }
}

export default LoaderView;
