'use client'

import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import { Button} from "@mui/material";
import {Grid} from "@mui/material";
import {useState} from "react";
import Client from "@pelicanplatform/web-client";


export default function Home() {

  let [discoveryUrl, setDiscoveryUrl] = useState<string>("https://osg-htc.org");
  let [discoveryUrlError, setDiscoveryUrlError] = useState<string | undefined>(undefined);
  let [filePath, setFilePath] = useState<string>("/osgconnect/public/osg/testfile.txt");
  let [filePathError, setFilePathError] = useState<string | undefined>(undefined);

  let [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const submit = async () => {

    let isValid = true;
    if(discoveryUrl === "") {
      setDiscoveryUrlError("Discovery Url is required");
      isValid = false
    }
    if(filePath === "") {
      setFilePathError("File Path is required");
      isValid = false
    }

    if(!isValid) return;

    const webClient = new Client(discoveryUrl!);
    try {
      await webClient.getFile(filePath)
    } catch (e) {
      setSubmitError((e as Error).message)
    }
  }

  return (
      <Box height={"90vh"}>
        <Grid height={"100%"} justifyContent={"center"} container>
          <Grid item xl={4} md={8} xs={11} display={"flex"}>
            <Box mt={6} mx={"auto"} width={"100%"} display={"flex"} flexDirection={"column"}>
              <TextField fullWidth onChange={e => {setDiscoveryUrl(e.target.value)}} value={discoveryUrl} id="outlined-basic" label="Discovery Url" variant="outlined" />
              <Box pt={1}>
                <TextField fullWidth onChange={e => {setFilePath(e.target.value)}} value={filePath} id="outlined-basic" label="File Path" variant="outlined" />
              </Box>
              { submitError ?
                <Box>
                  <Typography variant={"subtitle1"} color={"error"}>{submitError}</Typography>
                </Box> : undefined
              }
              <Box pt={1} mx={"auto"}>
                <Button variant="contained" onClick={submit}>Download</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
  )
}
