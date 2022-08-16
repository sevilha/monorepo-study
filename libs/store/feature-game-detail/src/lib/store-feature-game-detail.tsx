import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import './store-feature-game-detail.scss';
import { useEffect, useState } from 'react';
import { formatRating } from '@monorepo/store/util-formatters';
import { Game } from '@monorepo/api/util-interfaces';
import { HeaderProps } from '@monorepo/store/ui-shared';

export function StoreFeatureGameDetail() {
  const params = useParams();
  const header = {
    title: '',
  } as HeaderProps;

  const [state, setState] = useState<{
    data: Game | null;
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: null,
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });
    const gameId = params['id'];
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        header.title = 'Teste'
        setState({
          ...state,
          data: res,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
  }, [params['id']]);

  return (
    <div className="container" data-testid="game-detail-container">
      {state.loadingState === 'loading' ? (
        'Loading...'
      ) : state.loadingState === 'error' ? (
        <div>Error fetching data</div>
      ) : state.data == null ? (
        ''
      ) : (
        <Card>
          <CardActionArea>
            <CardMedia
              className="game-card-media"
              image={state.data.image}
              title={state.data.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>{state.data.name}</strong>
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="game-rating"
              >
                {state.data.description}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="game-rating"
              >
                <strong>Rating:</strong> {formatRating(state.data.rating)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default StoreFeatureGameDetail;
