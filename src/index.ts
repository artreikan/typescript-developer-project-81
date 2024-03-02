import Tag from './tag';

console.log(new Tag('br').toString());
// <br>

console.log(new Tag('img', { src: 'path/to/image' }).toString());
// <img src="path/to/image">

console.log(new Tag('input', { type: 'submit', value: 'Save' }).toString());
// <input type="submit" value="Save">

// Для парных тегов надо придумать как лучше
console.log(new Tag('label', {}, 'Email').toString());
// <label>Email</label>

console.log(new Tag('label', { for: 'email' }, 'Email').toString());
// <label for="email">Email</label>

console.log(new Tag('div').toString());
