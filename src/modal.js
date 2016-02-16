(function () {
  let modalWrapper = null
  let dataModals = null
  let openModals = []

  function disableParentEvents () {
    for (let i = 0; i < dataModals.length; i++) {
      let modal = dataModals[i]

      // Disable closing the modal wrapper if modal gets clicked
      modal.addEventListener('click', (event) => {
        event.stopPropagation()
      })
    }
  }

  function closeModalsOnEsc () {
    window.addEventListener('keyup', (event) => {
      if (openModals.length && event.keyCode === 27) {
        api.closeCurrent()
      }
    })
  }

  function closeModalWrapper () {
    modalWrapper.classList.remove('visible')

    // Re-enable parent scrolling
    document.body.style.overflow = 'auto'
  }

  let api = {
    init () {
      modalWrapper = document.querySelector('.modal-wrapper')
      dataModals = document.querySelectorAll('[data-modal]')

      let triggers = document.querySelectorAll('[data-modaltrigger]')
      for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('click', (event) => {
          let modalName = event.target.dataset.modaltrigger
          api.open(modalName)
        })
      }

      // Close all modals when clicking outside modal
      modalWrapper.addEventListener('click', (event) => {
        api.closeCurrent()
      })

      disableParentEvents()
      closeModalsOnEsc()
    },

    open (modalName, cb) {
      let modal = document.querySelectorAll(
        '[data-modal="' + modalName + '"]'
      )[0]

      // If modal is already open, don't do anything
      if (openModals.indexOf(modal) >= 0) return

      if (modal) {
        modal.classList.add('visible')
        modalWrapper.classList.add('visible')

        // Disable parent scrolling when modal is open
        document.body.style.overflow = 'hidden'

        openModals.push(modal)
      } else {
        console.error('Could not find modal with name "%s"', modalName)
      }

      typeof cb === 'function' && cb()
    },

    closeCurrent (cb) {
      let modal = openModals.pop()
      modal.classList.remove('visible')

      if (openModals.length === 0) {
        closeModalWrapper()
      }

      typeof cb === 'function' && cb()
    },

    closeAll (cb) {
      for (let i = 0; i < dataModals.length; i++) {
        dataModals[i].classList.remove('visible')
        closeModalWrapper()
      }

      typeof cb === 'function' && cb()
    }
  }

  window.modal = api
})()
