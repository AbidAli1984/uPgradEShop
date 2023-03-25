import "./Address.css";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import addressapi from "../../common/api/addressapi";
import { Utilities } from "../../common/utilities";

const Address = () => {
  const [addresses, setAddressess] = useState();
  //const [address, setAddress] = useState(Utilities.getEmptyAddress());
  const [userid] = useState(Utilities.getuserId());
  const [addressData, setAddressData] = useState(Utilities.getEmptyAddress());

  useEffect(() => {
    addressapi.getAddresses().then((result) => {
      const filteredAddress = result.filter(({ user }) => {
        return user == userid;
      });
      setAddressess(filteredAddress);
      setAddressData(
        filteredAddress.length > 0
          ? filteredAddress[0]
          : Utilities.getEmptyAddress()
      );
    });
  }, []);

  const handleChangeAddress = (id) => {
    debugger;
    addressapi.getAddress(id).then((result) => {
      console.log(result);
      setAddressData(result);
    });
  };

  return (
    <>
      <div className="addressoption">
        <div className="adressLabel">Select Address</div>
        <br />
        <Select
          value={addressData.id}
          onChange={(e) => {
            handleChangeAddress(e.target.value);
          }}
        >
          {addresses?.map((add) => {
            return <MenuItem value={add.id}>{add.name}</MenuItem>;
          })}
        </Select>
      </div>
      <Box className="addressContainer main-Box">
        <Typography variant="h5" paddingTop={0}>
          -OR -<br />
          <br />
          Add Address
        </Typography>
        <TextField
          fullWidth
          label="Name *"
          onChange={(e) => {
            addressData.name = e.target.value;
          }}
        />
        <TextField
          fullWidth
          label="Contact Number *"
          onChange={(e) => {
            addressData.contactNumber = e.target.value;
          }}
        />
        <TextField
          fullWidth
          label="Street *"
          onChange={(e) => {
            addressData.street = e.target.value;
          }}
        />
        <TextField
          fullWidth
          label="City *"
          onChange={(e) => {
            addressData.city = e.target.value;
          }}
        />
        <TextField
          fullWidth
          label="State *"
          onChange={(e) => {
            addressData.state = e.target.value;
          }}
        />
        <TextField
          fullWidth
          label="Landmark"
          onChange={(e) => {
            addressData.landmark = e.target.value;
          }}
        />
        <TextField
          fullWidth
          label="Zip code *"
          onChange={(e) => {
            addressData.zipcode = e.target.value;
          }}
        />
        <Button
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          color="info"
          onClick={() => {
            addressapi.saveaddress(addressData);
          }}
        >
          SAVE ADDRESS
        </Button>
      </Box>
    </>
  );
};
export default Address;
