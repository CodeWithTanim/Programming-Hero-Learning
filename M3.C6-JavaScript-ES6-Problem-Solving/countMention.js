const longestMention = (caption) => {
    const words = caption.split(" ")
    
    const mentions = words.filter(word=> word.startsWith("@"))

    
    let longestMention = "";

    // for(let i = 0; i< mentions.length; i++){
    //     const tag = mentions[i].slice(1)

    //     if(tag.length > longestMention.length){
    //         longestMention = tag
    //     }
    // }

    mentions.forEach((mention)=>{
        const tag = mention.slice(1); 
        if(tag.length > longestMention.length){
            longestMention = tag
        }
    })

    const rslt = { mentionCount: mentions.length, longestMention: longestMention } 

    return rslt

}

const returnResult = longestMention("Great session today @rafi @mim @sadia @karim")

console.log(returnResult)