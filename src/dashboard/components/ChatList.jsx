import { Chip, Grid } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


export default function ChatList({messages}) {
    const {auth: {userId}} = useContext(AuthContext);
    const isLoggedUser = useCallback((item) => item.from === userId, [userId]);

    return (
        <>
            {
                messages.map((item, index) => (
                    <Grid item
                        key={`${item.from}${index}`}
                        display='flex'
                        marginLeft={ isLoggedUser(item) ? 5 : null }
                        marginRight={ !isLoggedUser(item) ? 5 : null }
                        justifyContent={ isLoggedUser(item) ? 'end' : 'start' }
                    >
                        <Chip
                            label={item.message} 
                            sx={{ 
                                bgcolor: isLoggedUser(item) ? 'primary.dark' : blueGrey[100],
                                color: isLoggedUser(item) ? '#fff' : '#000',
                                height: 'auto',
                                '& .MuiChip-label': {
                                    display: 'block',
                                    fontSize: '18px',
                                    whiteSpace: 'normal',
                                    padding: '6px 14px',
                                },
                            }}
                        />
                    </Grid>
                ))
            }
        </>
    );
}