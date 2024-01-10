'use client'

import Box from "@mui/material/Box";
import {TextField, Typography, Autocomplete, createFilterOptions} from "@mui/material";
import { Button} from "@mui/material";
import {Grid} from "@mui/material";
import {useState} from "react";
import Client from "@pelicanplatform/web-client";

interface FederationName {
  label: string,
  value: string
}

let federationNames: FederationName[] = [{
    label: "OSDF",
    value: "https://osg-htc.org"
}]

const filter = createFilterOptions<FederationName>();

export default function Home() {

  let [federationNamespace, setFederationNamespace] = useState<FederationName | undefined>({label: "OSDF", value: "https://osg-htc.org"});
  let [federationNamespaceError, setFederationNamespaceError] = useState<string | undefined>(undefined);
  let [filePath, setFilePath] = useState<string>("/osgconnect/public/osg/testfile.txt");
  let [filePathError, setFilePathError] = useState<string | undefined>(undefined);

  let [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const submit = async () => {

    let isValid = true;
    if(federationNamespace === undefined) {
      setFederationNamespaceError("Federation Name is required");
      isValid = false
    }
    if(filePath === "") {
      setFilePathError("Object Name is required");
      isValid = false
    }

    if(!isValid) return;

    const webClient = new Client(federationNamespace?.value!);
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
              <Box pt={1}>
                <Autocomplete
                    fullWidth
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={federationNames}
                    value={federationNamespace}
                    onChange={(e, newValue) => {
											if (newValue && federationNames.includes(newValue as FederationName)) {
                        setFederationNamespace(newValue);
											} else if(newValue && newValue.label.startsWith("Add")){
                        setFederationNamespace({
                          label: newValue.value,
                          value: newValue.value
                        })
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const { inputValue } = params;
                      // Suggest the creation of a new value
                      const isExisting = options.some((option) => inputValue === option.label);
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          value: inputValue,
                          label: `Add "${inputValue}"`,
                        });
                      }
                      return filtered;
                    }}
                    id={"outlined-basic"}
                    renderInput={(params) => <TextField {...params} label="Federation Name" />}
                />
              </Box>
              <Box pt={2}>
                <TextField fullWidth onChange={e => {setFilePath(e.target.value)}} value={filePath} id="outlined-basic" label="Object Name" variant="outlined" />
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
