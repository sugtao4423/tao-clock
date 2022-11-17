import Astro from './Astro'
import BannerBanner from './banners/BannerBanner'
import BannerLivecamera from './banners/BannerLivecamera'
import BannerObservation from './banners/BannerObservation'
import BannerTopics from './banners/BannerTopics'
import LocationInfo from './LocationInfo'
import Mrf from './mrf/Mrf'
import MrfAttr from './mrf/MrfAttr'
import Srf from './srf/Srf'
import StrAttr from './srf/SrfAttr'
import TodayTomorrow from './todayTomorrow/TodayTomorrow'
import TodayTomorrowAttr from './todayTomorrow/TodayTomorrowAttr'

export interface Weather {
  from_area: number
  location_info: LocationInfo
  JCODE: string
  JCODENAME: string
  banner_list: [BannerObservation, BannerLivecamera, BannerBanner, BannerTopics]
  update_time: number
  areacode: string
  lat: number
  lon: number
  astro: Astro
  srf_attr: StrAttr
  srf: Srf[]
  srftitle: string
  srfcomment: string
  mrf_attr: MrfAttr
  mrf: Mrf[]
  mrftitle: string
  mrfcomment: string
  today_tomorrow_attr: TodayTomorrowAttr
  today_tomorrow: TodayTomorrow[]
  today_tomorrowtitle: string
  today_tomorrowcomment: string
}
