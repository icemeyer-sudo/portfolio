function paperPlane() {
    let letter = document.querySelector('.letter');
    let button = document.querySelector('.post');
    
    
    letter.setAttribute('style', 'transform: translate(700px, -700px)');
    
    
    letter.addEventListener('transitionend', () => {
        const div = document.querySelector('#contact > div:first-of-type');
        const clone = letter.cloneNode(true);
        letter.remove();
        clone.setAttribute('style', 'transform: translate(-1000px, 1000px)');
        div.append(clone);
        clone.offsetHeight;
        clone.setAttribute('style', 'transform: translate(0px, 0px)');
    })
}

export default paperPlane;