const deleteBtn = document.querySelector('.btn-delete');
deleteBtn.addEventListener('click', async (event) => {
  const response = await fetch(`${event.target.id}`,
    {
      method: 'DELETE',
    });
  const data = await response.json();
  if (data.success) {
    window.location = '/parties';
  } else {
    alert('Delete failed');
  }
});
