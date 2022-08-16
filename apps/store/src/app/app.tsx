// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.scss';
import { getAllGames } from '../fake-api';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { formatRating } from '@monorepo/store/util-formatters';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { StoreFeatureGameDetail } from '@monorepo/store/feature-game-detail';
import { Header } from '@monorepo/store/ui-shared';
export function App() {
  const navigate = useNavigate();
  return (
    <>
    <Header title='Board Game Hoard' />
      <div className="container">
        <div className="games-layout">
          {getAllGames().map((x) => (
            <Card
              key={x.id}
              className="game-card"
              onClick={() => navigate(`/game/${x.id}`)}
            >
              <CardActionArea>
                <CardMedia
                  className="game-card-media"
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="game-rating"
                  >
                    <strong>Rating:</strong> {formatRating(x.rating)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <Routes>
          <Route path="/game/:id" element={<StoreFeatureGameDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
