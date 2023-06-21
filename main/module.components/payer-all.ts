import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  public players: Player[];

  constructor(private playerService: PlayerService) {
    this.players = [];
  }

  public ngOnInit(): void {
    this.retrievePlayers();
  }

  public retrievePlayers(): void {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;
    });
  }

  public addPlayer(name: string): void {
    const playerName = name.trim();
    
    if (playerName) {
      this.playerService.addPlayer({ name: playerName } as Player)
      .subscribe((player) => {
        this.players.push(player);
      });
    }
  }

  public removePlayer(player: Player): void {
    this.players = this.players.filter((p) => p !== player);
    this.playerService.deletePlayer(player).subscribe();
  }
}
