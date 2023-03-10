import React from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { selectUnreadMessages } from '../messages/messagesSlice'


import { messageReceived } from '../messages/messagesSlice'

const TeamListItem = ({ team }) => {
    const dispatch = useDispatch()
    const cable = useContext(ActionCableContext)
    
    //...
  
    useEffect(() => {
      cable.subscriptions.create(
        { channel: 'MessagesChannel', id: team.id },
        {
          received: (data) => {
            dispatch(messageReceived(data))
          },
        }
      )
    }, [team, dispatch]);
    
    const numOfUnreads = useSelector((state) =>
    selectUnreadMessages(state, team.id)
  ).length;

  const getFontWeight = () => {
    if (location.pathname.slice(7) === team.id) {
      return 'fontWeightRegular';
    }
    return numOfUnreads === 0 ? 'fontWeightRegular' : 'fontWeightBold';
  }

  const renderedNumOfUnreads = () => {
    if (location.pathname.slice(7) === team.id) {
      return 0;
    }
    return numOfUnreads;
  };

  
    return (
        <Link to={`/teams/${team.id}`}>
        <Badge badgeContent={renderedNumOfUnreads()}>
          <Typography>
              <Box fontWeight={getFontWeight()}>{team.name}</Box>
            </Typography>
        </Badge>
      </Link>
    )
  }
  
  export default TeamListItem
  