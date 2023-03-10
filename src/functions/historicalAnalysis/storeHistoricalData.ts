import { readFromFirebase } from "../auth/firebase.read"
import { updateDocumnet } from "../auth/firebase.updateDocument"

export const storeHistoricalData = async (data: any[], shallStoreData: boolean) => {
  
  const rawData = data[0]
  const resData = data[1]

  // result stats
  return await readFromFirebase("attacks").then(async (res: any) => {
    const prevResData = res[1].docs[0].data()
    const id = res[1].docs[0].id
    const collectionName = 'attacks'

    let updatedData = {
      destination_ip: {},
      source_ip: {},
      attacks: {},
      protocols: {},
      timestamps: {
        '0': 0,
        '1': 0,    
        '2': 0,    
        '3': 0,    
        '4': 0,    
        '5': 0,    
        '6': 0,    
        '7': 0,    
        '8': 0,    
        '9': 0,    
        '10': 0,    
        '11': 0,    
        '12': 0,    
        '13': 0,    
        '14': 0,    
        '15': 0,    
        '16': 0,    
        '17': 0,    
        '18': 0,    
        '19': 0,    
        '20': 0,    
        '21': 0,    
        '22': 0,    
        '23': 0,    
      },
    }

    if (shallStoreData) {
      
      const destinationIpArray = prevResData['destination_ip']
      const sourceIpArray = prevResData['source_ip']
      const attackArray = prevResData['attacks']
      const protocolArray = prevResData['protocols']
      const timestampArray = prevResData['timestamps']

      // sorting attacks
      let dataAttackMap = new Map<string, number>()
      for (const key of Object.keys(attackArray)) {
        dataAttackMap.set(key, attackArray[key])
      }
      for (let i = 0; i < resData.length; i++) {
        let data = dataAttackMap.get(resData[i])  
        if (!data) {
          data = 0
        }
        dataAttackMap.set(resData[i], (data + 1))
      }

      // initializing other maps
      let dataDstIpMap = new Map<string, number>()
      for (const key of Object.keys(destinationIpArray)) {
        dataDstIpMap.set(key, destinationIpArray[key])
      }


      let dataSrcIpMap = new Map<string, number>()
      for (const key of Object.keys(sourceIpArray)) {
        dataSrcIpMap.set(key, sourceIpArray[key])
      }

      let dataProtocolMap = new Map<string, number>()
      for (const key of Object.keys(protocolArray)) {
        dataProtocolMap.set(key, protocolArray[key])
      }

      let dataTimeStampMap = new Map<string, number>()
      for (const key of Object.keys(timestampArray)) {
        dataTimeStampMap.set(key, timestampArray[key])
      }

      // populating other maps
      for (let i = 0; i < rawData.length; i++){

        // dst ip
        let a = ' Destination IP'
        let b = 'Destination IP'
        let c = 'Dst IP'
        let d = ' Dst IP'
        if (rawData[i][a]) {
          let data = dataDstIpMap.get(rawData[i][a])  
          if (!data) {
            data = 0
          }
          dataDstIpMap.set(rawData[i][a], (data + 1))
        } else if (rawData[i][b]) {
          let data = dataDstIpMap.get(rawData[i][b])  
          if (!data) {
            data = 0
          }
          dataDstIpMap.set(rawData[i][b], (data + 1))
        } else if (rawData[i][c]) {
          let data = dataDstIpMap.get(rawData[i][c])  
          if (!data) {
            data = 0
          }
          dataDstIpMap.set(rawData[i][c], (data + 1))
        } else if (rawData[i][d]) {
          let data = dataDstIpMap.get(rawData[i][d])  
          if (!data) {
            data = 0
          }
          dataDstIpMap.set(rawData[i][d], (data + 1))
        }

        // src ip
        a = 'Source IP'
        b = ' Source IP'
        c = 'Src IP'
        d = ' Src IP'
        if (rawData[i][a]) {
          let data = dataSrcIpMap.get(rawData[i][a])  
          if (!data) {
            data = 0
          }
          dataSrcIpMap.set(rawData[i][a], (data + 1))
        } else if (rawData[i][b]) {
          let data = dataSrcIpMap.get(rawData[i][b])  
          if (!data) {
            data = 0
          }
          dataSrcIpMap.set(rawData[i][b], (data + 1))
        } else if (rawData[i][c]) {
          let data = dataSrcIpMap.get(rawData[i][c])  
          if (!data) {
            data = 0
          }
          dataSrcIpMap.set(rawData[i][c], (data + 1))
        } else if (rawData[i][d]) {
          let data = dataSrcIpMap.get(rawData[i][d])  
          if (!data) {
            data = 0
          }
          dataSrcIpMap.set(rawData[i][d], (data + 1))
        }

        // protocol
        a = 'Protocol'
        b = ' Protocol'
        if (rawData[i][a]) {
          let data = dataProtocolMap.get(rawData[i][a])  
          if (!data) {
            data = 0
          }
          dataProtocolMap.set(rawData[i][a], (data + 1))
        } else if (rawData[i][b]) {
          let data = dataProtocolMap.get(rawData[i][b])  
          if (!data) {
            data = 0
          }
          dataProtocolMap.set(rawData[i][b], (data + 1))
        }

        // timestamp
        a = 'Timestamp'
        b = ' Timestamp'
        if (rawData[i][a]) {
          let time = new Date(rawData[i][a]).toLocaleTimeString('it-IT')
          let hour = time.split(':')[0]
          let data = dataTimeStampMap.get(hour)  
          if (!data) {
            data = 0
          }
          dataTimeStampMap.set(hour, (data + 1))
        } else if (rawData[i][b]) {
          let time = new Date(rawData[i][b]).toLocaleTimeString('it-IT')
          let hour = time.split(':')[0]
          let data = dataTimeStampMap.get(hour)  
          if (!data) {
            data = 0
          }
          dataTimeStampMap.set(hour, (data + 1))
        }

      }

      let dstIpObj:any =  { }
      for (const key of dataDstIpMap.keys()) {
        dstIpObj[key] = dataDstIpMap.get(key)
      }

      let srcIpObj:any =  { }
      for (const key of dataSrcIpMap.keys()) {
        srcIpObj[key] = dataSrcIpMap.get(key)
      }

      let attacksObj:any =  { }
      for (const key of dataAttackMap.keys()) {
        attacksObj[key] = dataAttackMap.get(key)
      }

      let protocolObj:any =  { }
      for (const key of dataProtocolMap.keys()) {
        protocolObj[key] = dataProtocolMap.get(key)
      }

      let timestampObj:any =  { }
      for (const key of dataTimeStampMap.keys()) {
        timestampObj[key] = dataTimeStampMap.get(key)
      }

      updatedData = {
        destination_ip: dstIpObj,
        source_ip: srcIpObj,
        attacks: attacksObj,
        protocols: protocolObj,
        timestamps: timestampObj,
      }
    }
    return await updateDocumnet(collectionName, id, updatedData).then((res: any) => {
      return res
    })
  })
}


