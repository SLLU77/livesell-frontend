export const getDisplayName = component => {
    return component.displayName || component.name || 'Component'
}

export const toCurrency = num => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'
}

export const getOrderTime = timeStamp => {
    const dateTime = new Date(+timeStamp)
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    return `${dateTime.getFullYear()} 年 ${dateTime.getMonth() + 1} 月 ${dateTime.getDate()} 日 (${
        weekdays[dateTime.getDay()]
    }) ${dateTime.getHours() + 1}:${dateTime.getMinutes() + 1}:${dateTime.getSeconds() + 1}`
}
