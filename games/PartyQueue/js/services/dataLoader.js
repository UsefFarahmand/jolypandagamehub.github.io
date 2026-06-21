// dataLoader.js
let _cache = null;

export async function loadCardData() {
    if (_cache) return _cache;
    
    const res = await fetch('./data/cardInfo.json');
    const cardInfo = await res.json();
    
    _cache = {
        CARDS: Object.fromEntries(
            cardInfo.map(card => [
                parseInt(card.power),
                { id: card.power, name: card.name, animal: card.emoji, image: card.image, power: card.power }
            ])
        ),
        CARD_IDS: Object.fromEntries(
            cardInfo.map(card => [
                card.name.toUpperCase().replace(' ', '_'),
                card.id
            ])
        ),
        CARD_INFO: cardInfo
    };
    
    return _cache;
}