
const updateBtn = document.querySelector('.btn-update');
updateBtn.addEventListener('click', async (event) => {
  const party = {
    title: event.target.parentNode.children[1].value,
    body: event.target.parentNode.children[3].value,
    startsAt: event.target.parentNode.children[5].value,
  };
  await fetch(`/parties/${event.target.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(party),
    });
  window.location = '/parties';
});
