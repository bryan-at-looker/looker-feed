import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Flex, FlexItem, InputSearch, Box, Paragraph } from '@looker/components';
import styled from 'styled-components'
import { RightColumn } from './RightColumn';
import { LeftColumn } from './LeftColumn'
import {find, sampleSize} from 'lodash'
import { MiddleColumnTop } from './MiddleColumnTop'
import { MiddleColumnFeed } from './MiddleColumnFeed';

const TRENDS_SPACE_ID = '257';
const FEED_SPACE_ID = '258'
const MAX_LOOPS = 20;

export function Page() {
  const [me, setMe] = useState({});
  const [feed, setFeed] = useState<any>([]);
  const [trends, setTrends] = useState<any>([]);
  const [follows, setFollows] = useState<any>([]);
  const [all_users, setAllUsers] = useState<any>([]);
  const [explores, setExplores] = useState<any>([]);
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  const right_width = 350;
  const left_width = 275;
  const middle_width = 600;
  const content_width = left_width+right_width+middle_width;

  useEffect(()=>{
    apiCall();
    getTrends();
    getFollow();
    getFeed();
    getExplores();
  },[])

  const saveFeed = async (type: string, input_value: string, qid?: string) => {
    let description: any = {
      type: type,
      details: input_value
    }
    if (qid && qid !== '') {
      const query = await sdk.ok(sdk.query_for_slug(qid))
      const look = await sdk.ok(sdk.create_look({
        query_id: query.id,
        description: JSON.stringify(description),
        folder_id: FEED_SPACE_ID,
        title: qid
      }))
      getFeed();
    }
  }

  const getExplores = async () => {
    const models = await sdk.ok(sdk.all_lookml_models())
    let exs: any = []
    models.forEach((m: any)=>{
      m.explores!.forEach((e: any)=>{
        if (!e.hidden) {
          exs.push({e, m, id: `${m.name}::${e.name}`})
        }
      })
    })
    setExplores(exs)
  }

  const getFeed = async () => {
    let looks = await sdk.ok(sdk.search_looks({
      space_id: FEED_SPACE_ID,
      per_page: 5,
      sorts: 'updated_at desc'
    }))
    setFeed(looks);
  }

  const getFollow = async () => {
    const users = await sdk.ok(sdk.all_users({}))
    setAllUsers(users.map(u=>{ return {
      id: u.id,
      avatar_url: u.avatar_url,
      first_name: u.first_name,
      last_name: u.last_name
    }}))
    setFollows(sampleSize(users, 3))
  }

  const apiCall = async () => {
    const me = await sdk.ok(sdk.me())
    setMe(me)
  }

  const getTrends = async () => {
    let looks = await sdk.ok(sdk.search_looks({
      space_id: TRENDS_SPACE_ID
    }))

    const query_tasks = looks.map((l) => { 
      return sdk.ok(sdk.create_query_task(
        {
          body: {
            query_id: l.query_id!,
            look_id: l.id,
            result_format: 'json_detail',
          },
          limit: 1,
          generate_drill_links: true    
        }
      )) 
    })
    const all_query_tasks = await Promise.all(query_tasks)

    let current_qt_ids = all_query_tasks.map(qt=>{ return qt.id!})
    let completed_tasks: any = []
    for ( var i=0; i<MAX_LOOPS; i++) {
      // @ts-ignore
      const current_qts: any = await sdk.ok(sdk.query_task_multi_results(current_qt_ids.join(',')))
      Object.keys(current_qts).forEach((id: any)=>{
        if (current_qts[id]['status'] === 'complete') {
          const aqt_found = find(all_query_tasks, {id: id })
          const look_found = (aqt_found) ? find(looks, {id: aqt_found.look_id!}) : {}
          completed_tasks.push({
            id: id,
            results: current_qts[id]['data'],
            data: current_qts[id]['data']['data'],
            look: look_found
          })
          // @ts-ignore
          current_qt_ids = removeA(current_qt_ids, id)
        }
      })
      if (current_qt_ids.length == 0 ) {
        break;
      }
      await (sleep(2000))
    }

    // TO DO WHEN WE HAVE MORE THEN 5;
    // let biggest_trends:any = []
    // completed_tasks.forEach(ct=>{ 
    //   if (biggest_trends <)
    // })

    setTrends(completed_tasks)
  }

  return (
    <Flex justifyContent="center">
      <StyledFlexItem width={left_width}>
        <TopDiv
          width={left_width}
        >
          <LeftColumn></LeftColumn>
        </TopDiv>
      </StyledFlexItem>
      <StyledFlexItem
        width={middle_width}
      >
        <Box border="1px solid lightgrey">
          <MiddleColumnFeed 
            explores={explores} 
            me={me} 
            feed={feed} 
            all_users={all_users}
            saveFeed={saveFeed}
          ></MiddleColumnFeed>
          <TopDiv width={middle_width-2}>
            <MiddleColumnTop></MiddleColumnTop>
          </TopDiv>
        </Box>

      </StyledFlexItem>
      <StyledFlexItem width={right_width}>
        <TopDiv
          width={right_width}
        ><RightColumn 
          trends={trends}
          follows={follows}
        ></RightColumn>
        </TopDiv>
      </StyledFlexItem>
    </Flex>
  );
}

const bc_color = 'rgba(255,255,255,1.00)'


const TopDiv = styled.div<any>`
  width: ${props => props.width}px;
  position: fixed;
  top: 0;
  background-color: ${bc_color};
`


const StyledFlexItem = styled(FlexItem)`
  width: ${props => props.width}px;
`


const sleep = async (ms: number) => {
  return new Promise(resolve  =>{
    setTimeout(resolve, ms)
  })
}

function removeA(arr: string[], a: string) {
  var ax; 
    while ((ax= arr.indexOf(a)) !== -1) {
      arr.splice(ax, 1);
    }
  return arr;
}