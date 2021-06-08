import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({
  name: 'modules/modal',
  stateFactory: true,
  namespaced: true
})
export default class CardModule extends VuexModule {
  public visible: boolean = false
  public id: string = ''

  @VuexMutation
  public setVisible() {
    this.visible = true
  }

  @VuexMutation
  public setInvisible() {
    this.visible = false
  }

  @VuexMutation
  public setId(id: string) {
    this.id = id
  }
}