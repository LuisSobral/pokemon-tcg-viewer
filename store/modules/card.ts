import { ICard } from '~/types/card'
import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({
  name: 'modules/card',
  stateFactory: true,
  namespaced: true
})
export default class CardModule extends VuexModule {
  public card: ICard | null = null

  @VuexMutation
  public selectCard(card: ICard) {
    this.card = card
  }
}