(function () {
  var modalWrapper = null
  var dataModals = null
  var openModals = []

  function disableParentEvents () {
    for (var i = 0; i < dataModals.length; i++) {
      var modal = dataModals[i]

      // Disable closing the modal wrapper if modal gets clicked
      modal.addEventListener('click', function (event) {
        event.stopPropagation()
      })

      // Disable parent scrolling when hovering modal
      modal.addEventListener('mouseover', function (event) {
        document.body.style.overflow = 'hidden'
      })
      modal.addEventListener('mouseout', function (event) {
        document.body.style.overflow = 'auto'
      })
    }
  }

  function closeModalsOnEsc () {
    window.addEventListener('keyup', function (event) {
      if (openModals.length && event.keyCode === 27) {
        api.closeCurrent()
      }
    })
  }

  var api = {
    init: function () {
      modalWrapper = document.querySelector('.modal-wrapper')
      dataModals = document.querySelectorAll('[data-modal]')

      var triggers = document.querySelectorAll('[data-modaltrigger]')
      for (var i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('click', function (event) {
          var modalName = event.target.dataset.modaltrigger
          api.open(modalName)
        })
      }

      // Close all modals when clicking outside modal
      modalWrapper.addEventListener('click', function (event) {
        api.closeCurrent()
      })

      disableParentEvents()
      closeModalsOnEsc()
    },

    open: function open (modalName, cb) {
      var modal = document.querySelectorAll(
        '[data-modal="' + modalName + '"]'
      )[0]

      // If modal is already open, don't do anything
      if (openModals.indexOf(modal) >= 0) return

      if (modal) {
        modal.classList.add('visible')
        modalWrapper.classList.add('visible')

        openModals.push(modal)
      } else {
        console.error('Could not find modal with name "%s"', modalName)
      }

      if (typeof cb === 'function') {
        cb()
      }
    },

    closeCurrent: function (cb) {
      var modal = openModals.pop()
      modal.classList.remove('visible')

      if (openModals.length === 0) {
        modalWrapper.classList.remove('visible')
      }

      if (typeof cb === 'function') {
        cb()
      }
    },

    closeAll: function (cb) {
      for (var i = 0; i < dataModals.length; i++) {
        dataModals[i].classList.remove('visible')
        modalWrapper.classList.remove('visible')
      }

      if (typeof cb === 'function') {
        cb()
      }
    }
  }

  window.modal = api
})()
