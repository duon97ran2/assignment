export const reRender = async (component, dom, id) => {
  if (component) {
    document.querySelector(dom).innerHTML = await component.render(id);
    component.afterRender(id);
  }
};