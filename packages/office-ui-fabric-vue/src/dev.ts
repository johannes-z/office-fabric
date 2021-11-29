import Vue from 'vue'
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '.'

const dialogStyles = { main: { maxWidth: 450 } }
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
}

new Vue({
  render (h) {
    return h('div', [
      h(Dialog, {
        props: {
          hidden: false,
          dialogContentProps,
          modalProps: {
            styles: dialogStyles,
          },
        },
      }, [
        h(DialogFooter, [
          h(PrimaryButton, 'Send'),
          h(DefaultButton, `Don't send`),
        ]),
      ]),
    ])
  },
}).$mount('#app')
