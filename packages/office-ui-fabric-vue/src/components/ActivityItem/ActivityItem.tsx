import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { getStyles } from './ActivityItem.styles'
import { IActivityItemProps } from './ActivityItem.types'
import { getClassNames } from './ActivityItem.classNames'
import { PersonaCoin } from '../Persona/PersonaCoin'
import { PersonaSize } from '../Persona/Persona.types'

@Component({
  components: { PersonaCoin },
})
export class ActivityItem extends BaseComponent<IActivityItemProps> {
  @Prop({ type: Array, default: () => [] }) activityPersonas!: any[]
  @Prop({ type: Boolean, default: false }) animateBeaconSignal!: boolean
  @Prop({ type: String, default: null }) beaconColorOne!: string
  @Prop({ type: String, default: null }) beaconColorTwo!: string
  @Prop({ type: Boolean, default: false }) isCompact!: boolean

  PersonaSize = PersonaSize

  get personaStyle () {
    if (!this.isCompact) return {}
    return {
      display: 'inline-block',
      width: '10px',
      minWidth: '10px',
      overflow: 'visible',
    }
  }

  get personasToRender () {
    const personaLimit = this.isCompact ? 3 : 4

    return this.activityPersonas
      .filter((person, index) => index < personaLimit)
  }

  get classNames (): any {
    const { styles, theme, className, activityPersonas, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact } = this

    return getClassNames(
      getStyles(theme, styles, animateBeaconSignal, beaconColorOne, beaconColorTwo, isCompact),
      className!,
      activityPersonas!,
      isCompact!,
    )
  }

  render () {
    const { classNames, activityPersonas, animateBeaconSignal, isCompact, personasToRender, personaStyle } = this

    return (
      <div class={classNames.root}>
        {(activityPersonas || this.$slots.icon) && (
          <div class={classNames.activityTypeIcon}>
            {(animateBeaconSignal && isCompact) && (<div class={classNames.pulsingBeacon} />)}

            {(activityPersonas.length > 0) && (
              <div class={classNames.personaContainer}>
                {personasToRender.map((person, index) => (
                  <PersonaCoin
                    {...{ props: person }}
                    key={person.key || index}
                    class={classNames.activityPersona}
                    size={(activityPersonas.length > 1 || isCompact) ? PersonaSize.size16 : PersonaSize.size32}
                    style={personaStyle} />
                ))}
              </div>
            )}

            {this.$slots.icon}
          </div>
        )}

        <div class={classNames.activityContent}>
          {this.$slots.activityDescription && (
            <span class={classNames.activityText}>
              {this.$slots.activityDescription}
            </span>
          )}
          {(!isCompact && this.$slots.comments) && (
            <div class={classNames.commentText}>
              {this.$slots.comments}
            </div>
          )}
          {(!isCompact && this.$slots.timeStamp) && (
            <div class={classNames.timeStamp}>
              {this.$slots.timeStamp}
            </div>
          )}
        </div>
      </div>
    )
  }
}
