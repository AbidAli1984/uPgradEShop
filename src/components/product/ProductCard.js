import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, openDeleteConfirm, isAdmin }) => {
  let navigate = useNavigate();

  return (
    <>
      <Card
        className="productCard"
        key={product.index}
        sx={{ width: 300, float: "left", margin: 5 }}
      >
        <CardMedia
          component="img"
          alt="product"
          height="200"
          image={product.imageUrl}
        />
        <CardContent sx={{ overflowY: "auto", height: 150 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ float: "right" }}
          >
            &#8377; {product.price}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
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
    </>
  );
};

export default ProductCard;
