// 예상 사용량 계산기

interface UsageEstimate {
  monthlyVisitors: number
  avgPageViews: number
  avgPageSize: number // MB
  pluginDownloads: number
  avgPluginSize: number // MB
}

function calculateVercelUsage(estimate: UsageEstimate) {
  // 대역폭 계산
  const webTraffic = estimate.monthlyVisitors * estimate.avgPageViews * estimate.avgPageSize
  const downloadTraffic = estimate.pluginDownloads * estimate.avgPluginSize
  const totalBandwidth = webTraffic + downloadTraffic

  // 서버리스 함수 호출 계산
  const apiCalls = estimate.monthlyVisitors * 10 // 평균 API 호출

  return {
    bandwidth: totalBandwidth,
    functionCalls: apiCalls,
    isWithinFreeLimit: totalBandwidth <= 100 && apiCalls <= 125000,
  }
}

// 예시 계산
const smallSite = calculateVercelUsage({
  monthlyVisitors: 1000,
  avgPageViews: 5,
  avgPageSize: 2, // 2MB per page
  pluginDownloads: 100,
  avgPluginSize: 5, // 5MB per plugin
})

console.log("소규모 사이트:", smallSite)
// 결과: 대역폭 10GB + 0.5GB = 10.5GB (무료 범위 내)

const mediumSite = calculateVercelUsage({
  monthlyVisitors: 10000,
  avgPageViews: 5,
  avgPageSize: 2,
  pluginDownloads: 1000,
  avgPluginSize: 5,
})

console.log("중간 규모 사이트:", mediumSite)
// 결과: 대역폭 100GB + 5GB = 105GB (무료 한도 초과!)
