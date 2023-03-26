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
    reset,
  } = useForm();

  const [addresses, setAddressess] = useState();

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

  const save = (data) => {
    data.user = Utilities.getuserId();
    addressapi.saveaddress(data).then((result) => {
      getAddressess(Utilities);
      props.setSelectedAddress(result);
      reset();
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
      <form className="addressContainer main-Box" onSubmit={handleSubmit(save)}>
        <Typography variant="h5" paddingTop={0}>
          -OR -<br />
          <br />
          Add Address
        </Typography>
        <TextField
          fullWidth
          label="Name *"
          {...register("name", { required: "Name is Required" })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Contact Number *"
          {...register("contactNumber", {
            required: "Contact Number is required",
          })}
          error={Boolean(errors.contactNumber)}
          helperText={errors.contactNumber?.message}
        />
        <TextField
          fullWidth
          label="Street *"
          {...register("street", { required: "Street is Required" })}
          error={Boolean(errors.street)}
          helperText={errors.street?.message}
        />
        <TextField
          fullWidth
          //value={addressData.city}
          label="City *"
          {...register("city", { required: "City is Required" })}
          error={Boolean(errors.city)}
          helperText={errors.city?.message}
          // onChange={(e) => {
          //   setAddressData({ ...addressData, city: e.target.value });
          // }}
        />
        <TextField
          fullWidth
          //value={addressData.state}
          label="State *"
          {...register("state", { required: "State is Required" })}
          error={Boolean(errors.state)}
          helperText={errors.state?.message}
          // onChange={(e) => {
          //   setAddressData({ ...addressData, state: e.target.value });
          // }}
        />
        <TextField
          fullWidth
          //value={addressData.landmark}
          label="Landmark"
          {...register("landmark")}
          // onChange={(e) => {
          //   setAddressData({ ...addressData, landmark: e.target.value });
          // }}
        />
        <TextField
          fullWidth
          //value={addressData.zipcode}
          label="Zip code *"
          {...register("zipcode", { required: "Zip code is Required" })}
          error={Boolean(errors.zipcode)}
          helperText={errors.zipcode?.message}
          // onChange={(e) => {
          //   setAddressData({ ...addressData, zipcode: e.target.value });
          // }}
        />
        <Button
          type="submit"
          sx={{ marginTop: 2 }}
          fullWidth
          variant="contained"
          color="info"
        >
          SAVE ADDRESS
        </Button>
      </form>
    </>
  );
};
export default Address;
