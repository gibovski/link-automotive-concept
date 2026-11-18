for (const photo of document.querySelectorAll('img[data-photo]')) {
  photo.addEventListener('load', () => {
    if (photo.naturalWidth > 1) {
      photo.closest('.photo-slot').classList.add('has-photo');
    }
  });
  photo.loading = 'lazy';
  photo.src = photo.dataset.photo;
}
