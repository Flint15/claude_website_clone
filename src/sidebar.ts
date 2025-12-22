const sidebarButton = document.getElementById('ts-sidebar-button')
const sidebarElement = document.querySelector('aside')

addSidebarButtonListener()
function addSidebarButtonListener() {  
  if (sidebarButton) {
    sidebarButton?.addEventListener('click', () => {
      sidebarElement?.classList.toggle('closed')
    })
  }
}