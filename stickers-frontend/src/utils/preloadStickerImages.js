export function preloadStickerImages(stickers) {
  const sources = [
    ...new Set(
      stickers.flatMap((sticker) =>
        [sticker.picture, sticker.pictureData].filter(Boolean)
      )
    ),
  ];

  return Promise.all(
    sources.map(
      (source) =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = resolve;
          image.src = source;
        })
    )
  );
}
