import "./Address.css";
import {
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import addressapi from "../../common/api/addressapi";
import { Utilities } from "../../common/utilities";
import { useForm } from "react-hook-form";

const Address = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addresses, setAddressess] = useState();
  const [addressData, setAddressData] = useState(Utilities.getEmptyAddress());

  const getAddressess = (util) => {
    addressapi.getAddresses().then((result) => {
      const filteredAddress = result.filter(({ user }) => {
        return user === util.getuserId();
      });
      setAddressess(filteredAddress);
    });
  };

  useEffect(() => {
    getAddressess(Utilities);
  }, []);

  const save = () => {
    addressapi.saveaddress(addressData).then((result) => {
      getAddressess(Utilities);
      setAddressData(Utilities.getEmptyAddress());
      props.setSelectedAddress(result);
    });
  };

  return (
    <>
      <div className="addressoption">
        <div className="adressLabel">Select Address</div>
        <br />
        <Select
          value={props.selectedAddress}
          onChange={(e) => {
            props.setSelectedAddress(e.target.value);
          }}
          input={<Input id="name-multiple" />}
        >
          {addresses?.map((add) => {
            return (
              <MenuItem key={add.id} value={add.id}>
                {`${add.name}-->${add.street}, ${add.city}`},{" "}
              </MenuItem>
            );
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
          value={addressData.name}
          label="Name *"
          onChange={(e) => {
            setAddressData({ ...addressData, name: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={addressData.contactNumber}
          label="Contact Number *"
          onChange={(e) => {
            setAddressData({ ...addressData, contactNumber: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={addressData.street}
          label="Street *"
          onChange={(e) => {
            setAddressData({ ...addressData, street: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={addressData.city}
          label="City *"
          onChange={(e) => {
            setAddressData({ ...addressData, city: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={addressData.state}
          label="State *"
          onChange={(e) => {
            setAddressData({ ...addressData, state: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={addressData.landmark}
          label="Landmark"
          onChange={(e) => {
            setAddressData({ ...addressData, landmark: e.target.value });
          }}
        />
        <TextField
          fullWidth
          value={addressData.zipcode}
          label="Zip code *"
          onChange={(e) => {
            setAddressData({ ...addressData, zipcode: e.target.value });
          }}
        />
        <Button
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          color="info"
          onClick={save}
        >
          SAVE ADDRESS
        </Button>
      </Box>
    </>
  );
};
export default Address;
