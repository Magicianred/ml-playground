global.__ml_playground_asset_public_path__ = './assets/';

export const setAssetPath = (path) => {
  console.log("setAssetPath, path");
  global.__ml_playground_asset_public_path__  = path;
};
