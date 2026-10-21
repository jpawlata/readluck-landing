const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');

function showToast(message, duration) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

shareBtn.addEventListener('click', async () => {
  const shareData = {
    title: 'readluck',
    text: 'Your next book is a lucky pick.',
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(`${shareData.title} — ${shareData.text} ${shareData.url}`);
      showToast('Link copied. Share readluck with a fellow reader!', 2800);
    } else {
      showToast('Copy this page URL from your browser to share readluck.', 3200);
    }
  } catch (e) {
    if (e.name !== 'AbortError') {
      showToast('Copy this page URL from your browser to share readluck.', 3200);
    }
  }
});
