# Lil'DressUp 👗👘

This is a template/example for making simple dress up web games.

Currently only styled for desktop use.

## Running Locally
*Lil'DressUp* is a simple static site, so all you have to do is open the `index.html` file in your browser.

***However***, you may come across an error (`The operation is insecure.`) when it comes to `DressUp.downloadImage()`.
Which will stop you from being able to download your image via the provided anchor. To get around this, you just have to run a local web server using something like [http-server](https://www.npmjs.com/package/http-server).

## Configurations

The `configure.js` file holds examples of what your configuration will look like.
Configuration for *Lil'DressUp* is basically just passing all your data game into your main `DressUp` class object.

There are a lot of comments in `lil-dressup.js` and `configure.js` to help you!

### Predefined `HTMLElement`s
Predefined `HTMLElements` are required for creating a new `DressUp` object.
These can be defined in script or your HTML file(s), like the provided example.

The require elements are as followed:
- `DressUp.display`: An element (preferably `div`) that all the `canvas` elements will be injected into.
This is the dress up game display.
- `DressUp.options`: An element (preferably `form`) that all the option `fieldset` elements will be injected into.
This is the main game controls.
- `DressUp.download`: An anchor that will download the final dress up image.
- `DressUp.final`: The `canvas` element that the final image will be created and displayed on.

### Permanent Layers
When defining layers, you can set whether they're permanent or not.

Permanent layers are layers that are always shown and don't change.
They **should*** have the `label` property.
One might use these layers for the body of a character or a watermark.

Non-permanent layers are ones meant to change. They **don't** have the `label` property.
This is a dress up game, you want things to change!

### Linking Layers
`Lil'DressUp` allows multiple layers to be linked to the same option.
This is for instances where dress up attributes are best/easier showed in different object orders,
e.g. the hair in front of a character's head and behind their head.
Instead of cutting out a head shape in the back of the hair, a layer behind the character's head
can display the full back hair and then be linked to the front hair.
The example dress up game shows this.

When linking layers, there's a parent layer and its children.
The children **do not** use the `label` or `linked` property.
This is the only exception to non-permanents needing labels.

The parent layer will have a `linked` property that's an array of child layer names.

Example from `configure.js`:
```js
{
    name: "hair_bottom",
    permanent: false,
    images: ["null.png", "hairs/hair_01_back.png", "hairs/hair_02_back.png", "hairs/hair_03_back.png"]
},
{
    name: "hair_top",
    permanent: false,
    label: "Hair",
    linked: ["hair_bottom"],
    images: ["null.png", "hairs/hair_01_front.png", "hairs/hair_02_front.png", "hairs/hair_03_front.png"]
},
```

### Images and Sizing
It's assumed that all images are the same dimensions.
`DressUp.size` is where you specify the size of the displayed canvases, not the image dimensions.
**But** you want the canvas sizes to be the same ration of your images,
e.g. if the images are square so should the canvases.

It's also assumed that all the images are inside the same parent folder.
`DressUp.image_location` is the location of said folder.

## Usage
*Lil'DressUp* comes with a premade screen system for switching between the menu, game, and end screen.
But if you wanted to use it with your own system or existing project, all you really need is the `lil-dressup.js` file.

The code is licensed under the [Do What The Fuck You Want To Public License](https://github.com/RodFireProductions/Lil-DressUp/blob/main/LICENSE).

The example art provided of is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
It can be attributed to RodFireProductions or Lil'DressUp.

## Contribution
I'm always open to contributions! `Lil'DressUp` isn't perfect but it can always be better!
You just gotta follow these ground rules:
- Update or add JSDoc comments for your code,
- Use the Prettier config files provided,
- And no using AI generated code or assets in your contributions!

---
![Lil'DressUp Button](https://github.com/RodFireProductions/Lil-DressUp/blob/main/images/lil_dressup.png)
