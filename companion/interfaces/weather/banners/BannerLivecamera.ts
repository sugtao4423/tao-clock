export default interface BannerLivecamera {
  type: 'livecamera'
  name: string
  id: string
  photo_list: {
    url: string
    date: number
  }[]
}
