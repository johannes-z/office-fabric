<template>
  <div>
    <h1>OModal</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default OModal</h2>
      <Toggle v-model="isDraggable"
              inline-label
              label="Is draggable"
              :styles="toggleStyles" />
      <DefaultButton @click.native="isModalOpen = true">Open Modal</DefaultButton>

      <Modal
        :title-aria-id="titleId"
        :is-open="isModalOpen"
        :is-blocking="false"
        :container-class-name="contentStyles.container"
        :drag-options="isDraggable ? dragOptions : undefined"
        @dismiss="hideModal">
        <div :class="contentStyles.header">
          <span :id="titleId">Lorem Ipsum</span>
          <IconButton
            :styles="iconButtonStyles"
            :icon-props="cancelIcon"
            aria-label="Close popup modal"
            @click.native="hideModal" />
        </div>
        <div :class="contentStyles.body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lorem nulla, malesuada ut sagittis sit
            amet, vulputate in leo. Maecenas vulputate congue sapien eu tincidunt. Etiam eu sem turpis. Fusce tempor
            sagittis nunc, ut interdum ipsum vestibulum non. Proin dolor elit, aliquam eget tincidunt non, vestibulum ut
            turpis. In hac habitasse platea dictumst. In a odio eget enim porttitor maximus. Aliquam nulla nibh,
            ullamcorper aliquam placerat eu, viverra et dui. Phasellus ex lectus, maximus in mollis ac, luctus vel eros.
            Vivamus ultrices, turpis sed malesuada gravida, eros ipsum venenatis elit, et volutpat eros dui et ante.
            Quisque ultricies mi nec leo ultricies mollis. Vivamus egestas volutpat lacinia. Quisque pharetra eleifend
            efficitur.
          </p>
          <p>
            Mauris at nunc eget lectus lobortis facilisis et eget magna. Vestibulum venenatis augue sapien, rhoncus
            faucibus magna semper eget. Proin rutrum libero sagittis sapien aliquet auctor. Suspendisse tristique a
            magna at facilisis. Duis rhoncus feugiat magna in rutrum. Suspendisse semper, dolor et vestibulum lacinia,
            nunc felis malesuada ex, nec hendrerit justo ex et massa. Quisque quis mollis nulla. Nam commodo est ornare,
            rhoncus odio eu, pharetra tellus. Nunc sed velit mi.
          </p>
          <p>
            Sed condimentum ultricies turpis convallis pharetra. Sed sagittis quam pharetra luctus porttitor. Cras vel
            consequat lectus. Sed nec fringilla urna, a aliquet libero. Aenean sed nisl purus. Vivamus vulputate felis
            et odio efficitur suscipit. Ut volutpat dictum lectus, ac rutrum massa accumsan at. Sed pharetra auctor
            finibus. In augue libero, commodo vitae nisi non, sagittis convallis ante. Phasellus malesuada eleifend
            mollis. Curabitur ultricies leo ac metus venenatis elementum.
          </p>
          <p>
            Aenean egestas quam ut erat commodo blandit. Mauris ante nisl, pellentesque sed venenatis nec, aliquet sit
            amet enim. Praesent vitae diam non diam aliquet tristique non ut arcu. Pellentesque et ultrices eros. Fusce
            diam metus, mattis eu luctus nec, facilisis vel erat. Nam a lacus quis tellus gravida euismod. Nulla sed sem
            eget tortor cursus interdum. Sed vehicula tristique ultricies. Aenean libero purus, mollis quis massa quis,
            eleifend dictum massa. Fusce eu sapien sit amet odio lacinia placerat. Mauris varius risus sed aliquet
            cursus. Aenean lectus magna, tincidunt sit amet sodales a, volutpat ac leo. Morbi nisl sapien, tincidunt sit
            amet mauris quis, sollicitudin auctor est.
          </p>
          <p>
            Nam id mi justo. Nam vehicula vulputate augue, ac pretium enim rutrum ultricies. Sed aliquet accumsan
            varius. Quisque ac auctor ligula. Fusce fringilla, odio et dignissim iaculis, est lacus ultrices risus,
            vitae condimentum enim urna eu nunc. In risus est, mattis non suscipit at, mattis ut ante. Maecenas
            consectetur urna vel erat maximus, non molestie massa consequat. Duis a feugiat nibh. Sed a hendrerit diam,
            a mattis est. In augue dolor, faucibus vel metus at, convallis rhoncus dui.
          </p>
        </div>
      </Modal>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultButton, IIconProps, Toggle, ContextualMenu, Modal, IconButton } from '@uifabric-vue/office-ui-fabric-vue'
import { getTheme, mergeStyleSets, FontWeights } from '@uifabric/styling'
import { IDragOptions } from '@uifabric-vue/office-ui-fabric-vue/src/components/Modal/Modal.types'

const theme = getTheme()

@Component({
  components: {
    DefaultButton, Modal, IconButton, Toggle,
  },
})
export default class ModalPage extends Vue {
  isModalOpen: boolean = false
  isDraggable: boolean = false

  titleId = 'Modal1'

  dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
  };

  cancelIcon: IIconProps = { iconName: 'Cancel' };

  contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
    },
    header: [
    // tslint:disable-next-line:deprecation
      theme.fonts.xLargePlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '12px 12px 14px 24px',
      },
    ],
    body: {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  });

  toggleStyles = { root: { marginBottom: '20px' } };
  iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
  };

  private hideModal () {
    this.isModalOpen = false
  }
}
</script>

<style lang="scss" module>
</style>
