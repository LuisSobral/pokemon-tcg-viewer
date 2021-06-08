import { Module, VuexAction, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({
  name: 'modules/search',
  stateFactory: true,
  namespaced: true
})
export default class SearchModule extends VuexModule {
  public query: string = ''

  @VuexMutation
  public updateQuery(q: string) {
    this.query = q
  }
}