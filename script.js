async function fetchData() {
    const res = await fetch('https://kitek.ktkv.dev/marketplace/api/items');
    const data = await res.json();
    const container = document.getElementById("container");
    
    container.innerHTML = data.map(i => `
        <div class="item-card">
            <img src="${i.imageUrl}" alt="${i.title}" class="item-image" />
            <div class="item-content">
                <span class="status-badge status-active">${i.status}</span>
                <h3 class="item-title">${i.title}</h3>
                <p class="item-description">${i.description}</p>
                <div class="item-footer">
                    <div>
                        <div class="item-price">${i.price ? i.price.toLocaleString() + ' ₽' : 'Цена не указана'}</div>
                        <div class="bid-info">${i.highestBid ? i.highestBid.toLocaleString() + ' ₽' : 'Нет ставок'} <span class="bid-count">${i.bidCount}</span></div>
                    </div>
                    <div class="item-meta"><span class="item-seller">Продавец: ${i.username}</span></div>
                </div>
            </div>
        </div>
    `).join("");
    
    const stats = document.getElementsByClassName("stat-value");
    stats[0].innerHTML = data.length;
    
    let bids = 0, active = 0, totalPrice = 0;
    data.forEach(i => {
        if (i.status === 'active') active++;
        if (i.bidCount > 0) bids += i.bidCount;
        if (i.price) totalPrice += i.price;
    });
    
    stats[1].innerHTML = bids;
    stats[2].innerHTML = active;
    stats[3].innerHTML = Math.round(totalPrice / data.length).toLocaleString() + ' ₽';
}