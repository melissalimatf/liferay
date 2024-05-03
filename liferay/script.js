let favorites = [
    { id: 1, title: "Reunião", date: "01/01/2024", time: "10:00", description: "Descrição do meetup 1", thumbnail: "imagens/img1-liferay.png" },
    { id: 2, title: "Conversa", date: "02/01/2024", time: "11:00", description: "Descrição do meetup 2", thumbnail: "imagens/img2-liferay.png" },
    { id: 3, title: "Bate papo", date: "03/01/2024", time: "12:00", description: "Descrição do meetup 3", thumbnail: "imagens/img3-liferay.png"  }
];


function filterFavorites(searchTerm) {
    return favorites.filter(video => {
        return (
            video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
}


document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.trim();

    if (searchTerm === '') {
        renderFavorites();
    } else {
        const filteredFavorites = filterFavorites(searchTerm);
        renderFavorites(filteredFavorites);
    }
});


function renderFavorites(filteredFavorites = favorites) {
    const favoritesContainer = document.getElementById('favoritesContainer');
    favoritesContainer.innerHTML = '';

    filteredFavorites.forEach(video => {
        const favoriteItem = createFavoriteItem(video);
        favoritesContainer.appendChild(favoriteItem);
    });
}


function createFavoriteItem(video) {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-3');

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = video.thumbnail;
    img.alt = video.title;
    img.classList.add('card-img-top');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.textContent = video.title;
    title.classList.add('card-title');

    const date = document.createElement('p');
    date.textContent = `Data: ${video.date}`;
    date.classList.add('card-text');

    const time = document.createElement('p');
    time.textContent = `Horário: ${video.time}`;
    time.classList.add('card-text');

    const description = document.createElement('p');
    description.textContent = `Descrição: ${video.description}`;
    description.classList.add('card-text');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Desfavoritar';
    removeButton.classList.add('btn', 'btn-danger', 'btn-remove');
    removeButton.addEventListener('click', () => removeFromFavorites(video.id));

    cardBody.appendChild(title);
    cardBody.appendChild(date);
    cardBody.appendChild(time);
    cardBody.appendChild(description);
    cardBody.appendChild(removeButton);

    card.appendChild(img);
    card.appendChild(cardBody);

    col.appendChild(card);

    return col;
}


function removeFromFavorites(videoId) {
    favorites = favorites.filter(video => video.id !== videoId);
    renderFavorites();
}


document.getElementById('filterButton').addEventListener('click', function() {
    var myModal = new bootstrap.Modal(document.getElementById('filterModal'));
    myModal.show();
});


document.querySelector('#filterModal .modal-footer .btn-primary').addEventListener('click', function() {
    const sortByDate = document.getElementById('sortByDate').checked;
    const sortByAlphabet = document.getElementById('sortByAlphabet').checked;

    if (sortByDate) {
        favorites.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    } else if (sortByAlphabet) {
        favorites.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
    }

    renderFavorites();
});


document.querySelectorAll('#filterModal .modal-body .form-check-input').forEach(function(input) {
    input.addEventListener('change', function() {
        if (this.id === 'sortByDate' && this.checked) {
            document.getElementById('sortByAlphabet').checked = false;
        } else if (this.id === 'sortByAlphabet' && this.checked) {
            document.getElementById('sortByDate').checked = false;
        }
    });
});


renderFavorites();


/*Script de Compartilhamento*/

    function copyLink() {
        var url = window.location.href;
        var inputElement = document.createElement("input");
        inputElement.value = url;
        document.body.appendChild(inputElement);
        inputElement.select();
        inputElement.setSelectionRange(0, 99999);
        document.execCommand("copy");
        document.body.removeChild(inputElement);
        alert("Link copiado para a área de transferência!");
    }



    // Adiciona evento de clique nas estrelas
    document.querySelectorAll('.star').forEach(function(star) {
        star.addEventListener('click', function() {
          var value = this.getAttribute('data-value');
          this.parentElement.querySelectorAll('.star').forEach(function(s) {
            s.classList.remove('active');
            if (s.getAttribute('data-value') <= value) {
              s.classList.add('active');
            }
          });
        });
      });
      
      document.getElementById('submit-comment').addEventListener('click', function() {
          var commentText = document.getElementById('comment').value;
          var commentsDiv = document.getElementById('comments');
          
          var commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
        
          var userInfoDiv = document.createElement('div');
          userInfoDiv.classList.add('user-info');
        
          var userAvatarImg = document.createElement('img');
          userAvatarImg.src = 'user.jpg'; // Substitua 'user.jpg' pelo caminho da imagem do usuário
          userAvatarImg.alt = 'Foto do usuário';
          userAvatarImg.classList.add('user-avatar');
        
          var userNameSpan = document.createElement('span');
          userNameSpan.textContent = 'Nome do Usuário'; // Substitua 'Nome do Usuário' pelo nome real do usuário
          userNameSpan.classList.add('user-name');
        
          userInfoDiv.appendChild(userAvatarImg);
          userInfoDiv.appendChild(userNameSpan);
        
          var commentPTag = document.createElement('p');
          commentPTag.textContent = commentText;
        
           // Copia as estrelas selecionadas para o comentário
      var ratingDiv = document.createElement('div');
      ratingDiv.classList.add('rating');
      var selectedStars = document.querySelectorAll('.star.active');
      selectedStars.forEach(function(star) {
        var starClone = star.cloneNode(true);
        starClone.style.color = 'gold'; // Define a cor das estrelas preenchidas
        ratingDiv.appendChild(starClone);
      });
  
      commentDiv.appendChild(userInfoDiv);
      commentDiv.appendChild(ratingDiv);
      commentDiv.appendChild(commentPTag);
    
      commentsDiv.appendChild(commentDiv);
  
      // Limpar o campo de texto e desmarcar as estrelas após o envio do comentário
      document.getElementById('comment').value = '';
      document.querySelectorAll('.star').forEach(function(star) {
        star.classList.remove('active');
      });
  });
    