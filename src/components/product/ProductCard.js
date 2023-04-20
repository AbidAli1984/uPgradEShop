import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Utilities } from "../../common/utilities";

const ProductCard = ({ product, openDeleteConfirm, isAdmin }) => {
  let navigate = useNavigate();
  const Item = Utilities.style.Item();

  return (
    <Grid className="productGrid" item md={6} lg={4} xs={12}>
      <Item>
        <Card className="productCard" key={product.index}>
          <CardMedia component="img" alt="product" image={product.imageUrl} />
          <CardContent sx={{ overflowY: "auto", height: 70 }}>
            <Typography component="div" sx={{ float: "right" }}>
              &#8377; {product.price}
            </Typography>
            <Typography>
              <b>{product.name}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                navigate("/productdetails", { state: { id: product.id } });
              }}
            >
              BUY
            </Button>
            {isAdmin && (
              <div style={{ textAlign: "right", width: "100%", color: "gray" }}>
                <IconButton
                  onClick={() => {
                    navigate("/editproduct", { state: { id: product.id } });
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => {
                    openDeleteConfirm(product.id);
                  }}
                >
                  <Delete />
                </IconButton>
              </div>
            )}
          </CardActions>
        </Card>
      </Item>
    </Grid>
  );
};

export default ProductCard;
