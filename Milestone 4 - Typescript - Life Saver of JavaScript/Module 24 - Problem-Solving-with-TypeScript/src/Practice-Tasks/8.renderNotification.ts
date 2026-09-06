interface LikeNotification {
    type: 'like'
    fromUser: string
}

interface SystemNotification {
    type: 'system'
    message: string
    actionUrl?: string
}


function renderNotification(notification: LikeNotification | SystemNotification): string {
    if (notification.type === 'like') {
        return `${notification.fromUser} liked your post.`
    } else if (notification.actionUrl) {
        let result = `System: ${notification.message}`
        result += " (Tap to View)"
        return result
    }
    return `System: ${notification.message}`
}

console.log(
    renderNotification({
        type: "like",
        fromUser: "Aisha",
    })
);

console.log(
    renderNotification({
        type: "system",
        message: "Maintenance complete.",
    })
);

console.log(
    renderNotification({
        type: "system",
        message: "Your subscription is expiring soon.",
        actionUrl: "/billing",
    })
);